import { cx } from '@emotion/css';
import React from 'react';
import { Theme } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import styles from './styles/CardTitle.module.css';

export interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  themeId?: Theme;
  variant?: 'subtitle';
  className?: string;
}

export function CardTitle({
  children,
  className,
  themeId: initThemeId,
  variant,
  ...props
}: CardTitleProps): React.ReactElement<CardTitleProps, 'div'> {
  const themeId = useThemeId(initThemeId);
  return (
    <div
      className={cx(
        styles.cardTitle,
        themeId && styles[`cardTitle--${themeId}`],
        variant && styles[`cardTitle--${variant}`],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

CardTitle.displayName = 'CardTitle';
