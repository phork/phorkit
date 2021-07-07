import { cx } from '@emotion/css';
import React from 'react';
import { AnyPosition } from '../../types';
import { lowerCamelize } from '../../utils/case';
import styles from './styles/Position.module.css';

export interface PositionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  fixed?: boolean;
  location: AnyPosition;
  raised?: boolean;
  style?: React.CSSProperties;
  variant?: 'inside' | 'outside' | 'middle';
}

export function Position({
  children,
  className,
  fixed = false,
  location,
  raised = false,
  style,
  variant = 'middle',
  ...props
}: PositionProps): React.ReactElement<PositionProps, 'div'> {
  return (
    <div
      className={cx(
        styles.position,
        styles[`position--${lowerCamelize(location)}`],
        styles[`position--${variant}`],
        fixed && styles['position--fixed'],
        raised && styles['position--raised'],
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

Position.displayName = 'Position';
