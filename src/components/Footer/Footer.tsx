import { cx } from '@emotion/css';
import React from 'react';
import { SequentialVariant, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Footer.module.css';

export type FooterProps = React.HTMLAttributes<HTMLDivElement> &
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
 * A footer is a flexible container with a colored
 * background and an optional border at the top. It
 * uses space-between to stretch the content.
 */
export function Footer({
  bordered = false,
  children,
  className,
  contrast = false,
  full = false,
  themeId: initThemeId,
  transparent = false,
  unthemed = false,
  variant: initVariant = 'primary',
  volume,
  ...props
}: FooterProps): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const variant = contrast ? 'contrast' : initVariant;

  const classes = cx(
    styles.footer,
    bordered && styles['footer--bordered'],
    bordered === 'pseudo' && styles['footer--bordered-pseudo'],
    full && styles['footer--full'],
    !unthemed && themeId && styles[`footer--${themeId}`],
    !unthemed && variant && styles[`footer--${variant}`],
    transparent && styles['footer--transparent'],
    volume && styles[`footer--${volume}`],
    className,
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

Footer.displayName = 'Footer';
