import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps, Orientation, SequentialVariant, Volume } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Divider.module.css';

export type DividerProps = React.HTMLAttributes<HTMLDivElement> &
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
export function Divider({
  className,
  contrast = false,
  orientation = 'horizontal',
  themeId: initThemeId,
  unthemed = false,
  variant: initVariant = 'primary',
  volume,
  ...props
}: DividerProps): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const variant = contrast ? 'contrast' : initVariant;

  return (
    <div
      aria-hidden={true}
      className={cx(
        styles.divider,
        styles[`divider--${orientation}`],
        themeId && !unthemed && styles[`divider--${themeId}`],
        variant && styles[`divider--${variant}`],
        volume && styles[`divider--${volume}`],
        className,
      )}
      {...props}
    />
  );
}

Divider.displayName = 'Divider';
