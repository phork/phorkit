import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps, Orientation, SequentialVariant, Volume, AsReactType } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Divider.module.css';

export type DividerElementType = 'div' | 'hr';

export type DividerProps<T extends DividerElementType = 'hr'> = AsReactType<T> &
  React.HTMLAttributes<HTMLElementTagNameMap[T]> &
  ThemeProps & {
    className?: string;
    orientation?: Orientation;
    style?: React.CSSProperties;
    variant?: SequentialVariant;
    volume?: Volume;
  };

/**
 * A divider is a vertical or horizontal rule
 * that can be one of several colors.
 */
export function Divider<T extends DividerElementType = 'hr'>({
  as,
  className,
  contrast = false,
  orientation = 'horizontal',
  themeId: initThemeId,
  unthemed = false,
  variant: initVariant = 'primary',
  volume,
  ...props
}: DividerProps<T>): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const variant = contrast ? 'contrast' : initVariant;
  const element = as || 'hr';

  return React.createElement(element, {
    'aria-orientation': orientation,
    className: cx(
      styles.divider,
      styles[`divider--${orientation}`],
      themeId && !unthemed && styles[`divider--${themeId}`],
      variant && styles[`divider--${variant}`],
      volume && styles[`divider--${volume}`],
      className,
    ),
    role: 'separator',
    ...props,
  });
}

Divider.displayName = 'Divider';
