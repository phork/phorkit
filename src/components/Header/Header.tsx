import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import styles from './styles/Header.module.css';

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  bordered?: boolean;
  children: React.ReactNode;
  className?: string;
  full?: boolean;
  raised?: boolean;
  variant?: 'global' | 'transparent';
}

export function Header({
  bordered,
  children,
  className,
  contrast,
  full,
  raised,
  themeId: initThemeId,
  unthemed,
  variant: initVariant,
  ...props
}: HeaderProps): React.ReactElement<HeaderProps, 'div'> {
  const themeId = useThemeId(initThemeId);
  const variant = contrast ? 'contrast' : initVariant;

  const classes = cx(
    styles.header,
    bordered && styles['header--bordered'],
    raised && styles['header--raised'],
    full && styles['header--full'],
    !unthemed && themeId && styles[`header--${themeId}`],
    !unthemed && variant && styles[`header--${variant}`],
    className,
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
