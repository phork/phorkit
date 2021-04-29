import { cx } from '@emotion/css';
import React from 'react';
import { AsReactType, MergeElementProps, ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import styles from './styles/Tags.module.css';

export type TagElementType = Extract<keyof JSX.IntrinsicElements, 'button' | 'a' | 'div' | 'span'>;
export type TagShape = 'pill' | 'brick';
export type TagSize = 'small' | 'medium' | 'large';

export interface LocalTagProps extends ThemeProps {
  actionable?: boolean;
  className?: string;
  flush?: boolean;
  label: React.ReactNode;
  shape?: TagShape;
  size?: TagSize;
}

export type TagProps<T extends TagElementType = 'div'> = AsReactType<T> & MergeElementProps<T, LocalTagProps>;

export function TagBase<T extends TagElementType = 'div'>(
  {
    actionable,
    as,
    className,
    contrast,
    flush,
    label,
    shape = 'pill',
    size = 'small',
    themeId: initThemeId,
    unthemed,
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
