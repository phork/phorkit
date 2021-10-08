import { cx } from '@emotion/css';
import React from 'react';
import ReactDOM from 'react-dom';
import { lowerCamelize } from '../../utils/case';
import styles from './styles/ToastContainer.module.css';
import { ToastContainerPosition } from './types';

export type ToastContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
  position: ToastContainerPosition;
  style?: React.CSSProperties;
};

/**
 * The toast container renders a portal that wraps a
 * collection of `Toast` components and positions itself
 * at one of the corners of the viewport or along the
 * top or bottom edge.
 */
export function ToastContainer({
  children,
  className,
  position = 'bottom-right',
  ...props
}: ToastContainerProps): React.ReactPortal | null {
  return typeof document !== 'undefined'
    ? ReactDOM.createPortal(
        <div
          className={cx(
            styles.toastContainer,
            position && styles[`toastContainer--${lowerCamelize(position)}`],
            className,
          )}
          {...props}
        >
          {children}
        </div>,
        document.body,
      )
    : null;
}

ToastContainer.displayName = 'ToastContainer';
