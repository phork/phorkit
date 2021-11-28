import { cx } from '@emotion/css';
import React from 'react';
import { SequentialVariant, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Header.module.css';

export type HeaderProps = React.HTMLAttributes<HTMLDivElement> &
  ThemeProps & {
    bordered?: boolean | 'pseudo';
    children: React.ReactChild | React.ReactFragment;
    className?: string;
    full?: boolean;
    style?: React.CSSProperties;
    transparent?: boolean;
    variant?: SequentialVariant;
    volume?: 'quiet';
  };

/**
 * A header is a flexible container with a colored
 * background and an optional border at the bottom.
 * It uses space-between to stretch the content.
 */
export function Header({
  bordered = false,
  children,
  className,
  contrast = false,
  full = false,
  themeId: initThemeId,
  transparent,
  unthemed = false,
  variant: initVariant = 'primary',
  volume,
  ...props
}: HeaderProps): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const variant = contrast ? 'contrast' : initVariant;

  const classes = cx(
    styles.header,
    bordered && styles['header--bordered'],
    bordered === 'pseudo' && styles['header--bordered-pseudo'],
    full && styles['header--full'],
    !unthemed && themeId && styles[`header--${themeId}`],
    !unthemed && variant && styles[`header--${variant}`],
    transparent && styles['header--transparent'],
    volume && styles[`header--${volume}`],
    className,
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

Header.displayName = 'Header';
