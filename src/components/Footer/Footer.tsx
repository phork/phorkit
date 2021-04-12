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
  raised?: boolean;
  variant?: 'primary' | 'secondary' | 'transparent';
}

export function Footer({
  bordered,
  children,
  className,
  contrast,
  full,
  raised,
  themeId: initThemeId,
  unthemed,
  variant: initVariant = 'primary',
  ...props
}: FooterProps): React.ReactElement<FooterProps, 'div'> {
  const themeId = useThemeId(initThemeId);
  const variant = contrast ? 'contrast' : initVariant;

  const classes = cx(
    styles.footer,
    bordered && styles['footer--bordered'],
    bordered === 'pseudo' && styles['footer-bordered-pseudo'],
    raised && styles['footer--raised'],
    full && styles['footer--full'],
    !unthemed && themeId && styles[`footer--${themeId}`],
    !unthemed && variant && styles[`footer--${variant}`],
    className,
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
