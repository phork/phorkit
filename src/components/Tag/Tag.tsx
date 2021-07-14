import { cx } from '@emotion/css';
import React from 'react';
import { AsReactType, MergeElementProps, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Tag.module.css';

export type TagElementType = Extract<keyof JSX.IntrinsicElements, 'button' | 'a' | 'div' | 'span'>;
export type TagShape = 'pill' | 'brick';
export type TagSize = '2xsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'custom';
export type TagVariant = 'outlined' | 'shaded' | 'solid';

export interface LocalTagProps extends ThemeProps {
  actionable?: boolean;
  className?: string;
  flush?: boolean;
  label: React.ReactNode;
  shape?: TagShape;
  size?: TagSize;
  variant?: TagVariant;
}

export type TagProps<T extends TagElementType = 'div'> = AsReactType<T> & MergeElementProps<T, LocalTagProps>;

export function TagBase<T extends TagElementType = 'div'>(
  {
    actionable = false,
    as,
    className,
    contrast = false,
    flush = false,
    label,
    shape = 'pill',
    size = 'small',
    themeId: initThemeId,
    variant = 'shaded',
    unthemed = false,
    ...props
  }: TagProps<T>,
  forwardedRef: React.ForwardedRef<HTMLElementTagNameMap[T]>,
): React.ReactElement {
  const themeId = useThemeId(initThemeId);
  const color = contrast ? 'contrast' : 'primary';
  const element = as || (actionable ? 'button' : 'div');

  return React.createElement(
    element,
    {
      className: cx(
        styles.tag,
        color && !unthemed && styles[`tag--${color}`],
        shape && styles[`tag--${shape}`],
        size && styles[`tag--${size}`],
        actionable && styles['tag--actionable'],
        flush && styles['tag--flush'],
        themeId && !unthemed && styles[`tag--${themeId}`],
        variant && styles[`tag--${variant}`],
        className,
      ),
      ref: forwardedRef,
      role: actionable ? 'button' : undefined,
      tabIndex: actionable ? 0 : -1,
      ...(props as TagProps<T>),
    },
    label,
  );
}

export const Tag = React.forwardRef(TagBase) as typeof TagBase;

TagBase.displayName = 'TagBase';
Tag.displayName = 'Tag';
