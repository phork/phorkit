import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import styles from './styles/Footer.module.css';

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  bordered?: boolean | 'pseudo';
  children: React.ReactNode;
  className?: string;
  full?: boolean;
  variant?: 'primary' | 'secondary' | 'transparent';
  volume?: 'quiet';
}

export function Footer({
  bordered = false,
  children,
  className,
  contrast = false,
  full = false,
  themeId: initThemeId,
  unthemed = false,
  variant: initVariant = 'primary',
  volume,
  ...props
}: FooterProps): React.ReactElement<FooterProps, 'div'> {
  const themeId = useThemeId(initThemeId);
  const variant = contrast ? 'contrast' : initVariant;

  const classes = cx(
    styles.footer,
    bordered && styles['footer--bordered'],
    bordered === 'pseudo' && styles['footer-bordered-pseudo'],
    full && styles['footer--full'],
    !unthemed && themeId && styles[`footer--${themeId}`],
    !unthemed && variant && styles[`footer--${variant}`],
    full && styles['footer--full'],
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
