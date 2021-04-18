import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import styles from './styles/Header.module.css';

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  bordered?: boolean | 'pseudo';
  children: React.ReactNode;
  className?: string;
  full?: boolean;
  raised?: boolean;
  variant?: 'primary' | 'secondary' | 'transparent';
  volume?: 'quiet';
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
  variant: initVariant = 'primary',
  volume,
  ...props
}: HeaderProps): React.ReactElement<HeaderProps, 'div'> {
  const themeId = useThemeId(initThemeId);
  const variant = contrast ? 'contrast' : initVariant;

  const classes = cx(
    styles.header,
    bordered && styles['header--bordered'],
    bordered === 'pseudo' && styles['header-bordered-pseudo'],
    raised && styles['header--raised'],
    full && styles['header--full'],
    !unthemed && themeId && styles[`header--${themeId}`],
    !unthemed && variant && styles[`header--${variant}`],
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
