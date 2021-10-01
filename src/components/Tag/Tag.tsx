import { cx } from '@emotion/css';
import React from 'react';
import { AsReactType, MergeElementPropsWithoutRef, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Tag.module.css';

export type TagElementType = Extract<keyof JSX.IntrinsicElements, 'button' | 'a' | 'div' | 'span'>;
export type TagShape = 'pill' | 'brick';
export type TagSize = '2xsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'custom';
export type TagWeight = 'outlined' | 'shaded' | 'solid';

export interface LocalTagProps extends ThemeProps {
  /** An actionable tag renders a button */
  actionable?: boolean;
  children: React.ReactNode;
  className?: string;
  /** This will remove all padding from the tag */
  flush?: boolean;
  shape?: TagShape;
  size?: TagSize;
  style?: React.CSSProperties;
  weight?: TagWeight;
}

export type TagProps<T extends TagElementType = 'div'> = AsReactType<T> & MergeElementPropsWithoutRef<T, LocalTagProps>;

export function TagBase<T extends TagElementType = 'div'>(
  {
    actionable = false,
    as,
    children,
    className,
    contrast = false,
    flush = false,
    shape = 'pill',
    size = 'small',
    themeId: initThemeId,
    unthemed = false,
    weight = 'shaded',
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
        weight && styles[`tag--${weight}`],
        className,
      ),
      ref: forwardedRef,
      role: actionable ? 'button' : undefined,
      tabIndex: actionable ? 0 : -1,
      ...(props as TagProps<T>),
    },
    children,
  );
}

/**
 * A tag represents a small segment of data and can be
 * static or actionable. Similar to buttons, tags can
 * have one of several fill styles and colors.
 */
export const Tag = React.forwardRef(TagBase) as <T extends TagElementType = 'div'>(
  p: TagProps<T> & { ref?: React.Ref<HTMLElementTagNameMap[T]> },
) => React.ReactElement<T>;

// note that the base element cannot have a displayName because it breaks Storybook
(Tag as React.NamedExoticComponent).displayName = 'Tag';
