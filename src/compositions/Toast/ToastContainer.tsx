import { cx } from '@emotion/css';
import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainerPosition } from './types';
import { lowerCamelize } from '../../utils/case';
import styles from './styles/ToastContainer.module.css';

export interface ToastContainerProps {
  children: React.ReactNode;
  className?: string;
  position: ToastContainerPosition;
}

export function ToastContainer({
  children,
  className,
  position = 'bottom-right',
}: ToastContainerProps): React.ReactPortal | null {
  return typeof document !== 'undefined'
    ? ReactDOM.createPortal(
        <div
          className={cx(
            styles.toastContainer,
            position && styles[`toastContainer--${lowerCamelize(position)}`],
            className,
          )}
        >
          {children}
        </div>,
        document.body,
      )
    : null;
}
