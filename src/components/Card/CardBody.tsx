import { cx } from '@emotion/css';
import React from 'react';
import { Theme } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import styles from './styles/CardBody.module.css';

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  flush?: boolean;
  themeId?: Theme;
}

export function CardBody({
  children,
  className,
  flush,
  themeId: initThemeId,
  ...props
}: CardBodyProps): React.ReactElement<CardBodyProps, 'div'> {
  const themeId = useThemeId(initThemeId);
  return (
    <div
      className={cx(
        styles.cardBody,
        flush && styles['cardBody--flush'],
        themeId && styles[`cardBody--${themeId}`],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
