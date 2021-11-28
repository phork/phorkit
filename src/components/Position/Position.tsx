import { cx } from '@emotion/css';
import React from 'react';
import { AnyPosition } from '../../types';
import { lowerCamelize } from '../../utils/case';
import styles from './styles/Position.module.css';

export type PositionProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactChild | React.ReactFragment;
  className?: string;
  fixed?: boolean;
  location: AnyPosition | 'center';
  raised?: boolean;
  style?: React.CSSProperties;
  variant?: 'inside' | 'outside' | 'middle';
};

/**
 * A simple container that sets its position relative to
 * its parent. The position can be at one of the corners,
 * in the direct center, or centered along one of the
 * edges.
 */
export function Position({
  children,
  className,
  fixed = false,
  location,
  raised = false,
  style,
  variant = 'middle',
  ...props
}: PositionProps): JSX.Element {
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
