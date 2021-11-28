import { cx } from '@emotion/css';
import React from 'react';
import {
  AccentColor,
  AsReactType,
  HorizontalPosition,
  MergeElementPropsWithoutRef,
  SequentialVariant,
  StateColor,
  Theme,
  Volume,
} from '../../types';
import { useThemeId } from '../../context/Theme';
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

export type LocalTypographyProps = {
  align?: HorizontalPosition | 'center';
  /** The children are optional so that this component can be passed as empty and then cloned */
  children?: React.ReactChild | React.ReactFragment | null;
  className?: string;
  color?: SequentialVariant | AccentColor | StateColor | 'neutral' | 'contrast';
  fullWidth?: boolean;
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  /** Reset all the font styles to their defaults */
  reset?: boolean;
  size?:
    | '2xsmall'
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | '2xlarge'
    | '3xlarge'
    | '4xlarge'
    | '5xlarge'
    | '6xlarge'
    | '7xlarge'
    | '8xlarge';
  style?: React.CSSProperties;
  themeId?: Theme;
  weight?: 'lighter' | 'light' | 'regular' | 'bold' | 200 | 500 | 600;
  variants?: TypographyVariants | TypographyVariants[] | { [key in TypographyVariants]: boolean };
  volume?: Volume;
};

export type TypographyProps<T extends keyof JSX.IntrinsicElements = 'span'> = AsReactType<T> &
  MergeElementPropsWithoutRef<T, LocalTypographyProps>;

export function TypographyBase<T extends keyof JSX.IntrinsicElements = 'span'>(
  {
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
  }: TypographyProps<T>,
  forwardedRef: React.ForwardedRef<JSX.IntrinsicElements[T]>,
): React.ReactElement {
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
      ref: forwardedRef,
      style,
      ...props,
    },
    children,
  );
}

/**
 * The typography component adds type styles to a
 * container element. It can change size, line height,
 * color, weight, case, etc. It doesn't have any
 * default styles, so it won't override an existing
 * style when that prop is left undefined.
 *
 * There's also a `reset` flag that will override
 * most styles and set them back to their defaults.
 */
export const Typography = React.forwardRef(TypographyBase) as <T extends keyof JSX.IntrinsicElements = 'span'>(
  p: TypographyProps<T> & { ref?: React.Ref<JSX.IntrinsicElements[T]> },
) => React.ReactElement<T>;

// note that the base element cannot have a displayName because it breaks Storybook
(Typography as React.NamedExoticComponent).displayName = 'Typography';
