import { cx } from '@emotion/css';
import React from 'react';
import { Theme } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { lowerCamelize } from '../../utils/case';
import styles from './styles/CardEdge.module.css';

export interface CardEdgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  justify?: 'centered' | 'end' | 'spread' | 'start';
  themeId?: Theme;
}

export function CardEdge({
  children,
  className,
  justify = 'spread',
  themeId: initThemeId,
  ...props
}: CardEdgeProps): React.ReactElement<CardEdgeProps, 'div'> {
  const themeId = useThemeId(initThemeId);
  return (
    <div
      className={cx(
        styles.cardEdge,
        themeId && styles[`cardEdge--${themeId}`],
        justify && styles[`cardEdge--${lowerCamelize('justify', justify)}`],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
