import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import styles from './styles/Footer.module.css';

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  bordered?: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: 'global' | 'transparent';
}

export function Footer({
  bordered,
  children,
  className,
  contrast,
  themeId: initThemeId,
  unthemed,
  variant: initVariant,
  ...props
}: FooterProps): React.ReactElement<FooterProps, 'div'> {
  const themeId = useThemeId(initThemeId);
  const variant = contrast ? 'contrast' : initVariant;

  const classes = cx(
    styles.footer,
    bordered && styles['footer--bordered'],
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
