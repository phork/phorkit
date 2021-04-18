import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/Modal.module.css';

export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
  style?: React.CSSProperties;
}

export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  (
    { children, className, scrollable, style, ...props },
    forwardedRef,
  ): React.ReactElement<ModalContentProps, 'div'> => {
    return (
      <div
        ref={forwardedRef}
        className={cx(styles.modalContent, scrollable && styles['modalContent--scrollable'], className)}
        {...props}
      >
        <div className={styles.modalContent__interior} style={style}>
          {children}
        </div>
      </div>
    );
  },
);

ModalContent.displayName = 'ModalContent';
