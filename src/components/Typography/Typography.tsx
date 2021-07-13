import { cx } from '@emotion/css';
import React, { CSSProperties } from 'react';
import { AsReactType, HorizontalPosition, MergeElementPropsWithoutRef, Theme, Volume } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import styles from './styles/Typography.module.css';

export type TypographyVariants =
  | 'italic'
  | 'underline'
  | 'blackout'
  | 'blackout-rounded'
  | 'spoiler'
  | 'truncated'
  | 'uppercase'
  | 'lowercase'
  | 'unset-case'
  | 'letter-spacing-comfy'
  | 'line-height-smash'
  | 'line-height-comfy'
  | 'line-height-normal'
  | 'space-after'
  | 'space-before'
  | 'no-select'
  | 'no-wrap'
  | 'wrap'
  | 'reset'
  | 'medium-caps'
  | 'small-caps'
  | 'xsmall-caps';

export interface LocalTypographyProps {
  align?: HorizontalPosition | 'center';
  /** children aren't required so that <Typography /> can be used as a wrapper */
  children?: React.ReactNode;
  className?: string;
  color?: string;
  fullWidth?: boolean;
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  reset?: boolean;
  size?:
    | 'xxs'
    | 'xs'
    | 's'
    | 'm'
    | 'l'
    | 'xl'
    | 'xxl'
    | 'xxxl'
    | 'xxxxl'
    | 'xxxxxl'
    | 'xxxxxxl'
    | 'xxxxxxxl'
    | 'xxxxxxxxl';
  style?: CSSProperties;
  themeId?: Theme;
  weight?: 'lighter' | 'light' | 'regular' | 'bold' | 200 | 500 | 600;
  variants?: TypographyVariants | TypographyVariants[] | { [key in TypographyVariants]: boolean };
  volume?: Volume;
}

export type TypographyProps<T extends keyof JSX.IntrinsicElements = 'span'> = AsReactType<T> &
  MergeElementPropsWithoutRef<T, LocalTypographyProps>;

export function Typography<T extends keyof JSX.IntrinsicElements = 'span'>({
  align,
  as,
  children,
  className,
  color,
  fullWidth = false,
  heading,
  reset = false,
  size,
  style,
  themeId: initThemeId,
  weight,
  variants,
  volume,
  ...props
}: TypographyProps<T>): React.ReactElement {
  const themeId = useThemeId(initThemeId);

  const variantStyles = () => {
    if (typeof variants === 'string') {
      return styles[`text-${variants}`];
    }
    if (typeof variants === 'object' && Array.isArray(variants)) {
      return variants.map(variant => styles[`text-${variant}`]);
    }
    if (typeof variants === 'object' && variants.constructor === Object) {
      return (Object.keys(variants) as TypographyVariants[]).reduce((acc: string[], variant) => {
        if (variants[variant]) {
          acc.push(styles[`text-${variant}`]);
        }
        return acc;
      }, []);
    }
    return undefined;
  };

  return React.createElement(
    as || 'span',
    {
      className: cx(
        variantStyles(),
        as && typeof as === 'string' && styles[as],
        align && styles[`text-align-${align}`],
        color && styles[`text-color-${color}`],
        fullWidth && styles['text-width-full'],
        heading && styles[heading],
        reset && styles['text-reset'],
        size && styles[`text-size-${size}`],
        themeId && styles[`text--${themeId}`],
        volume && styles[`text-volume-${volume}`],
        weight && styles[`text-weight-${weight}`],
        className,
      ),
      style,
      ...props,
    },
    children,
  );
}

Typography.displayName = 'Typography';
