import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/Modal.module.css';

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  flush?: boolean;
  scrollable?: boolean;
  style?: React.CSSProperties;
}

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  (
    { children, className, flush, scrollable, style, ...props },
    forwardedRef,
  ): React.ReactElement<ModalBodyProps, 'div'> => {
    return (
      <div
        ref={forwardedRef}
        className={cx(
          styles.modalBody,
          flush && styles['modalBody--flush'],
          scrollable && styles['modalBody--scrollable'],
          className,
        )}
        style={style}
        {...props}
      >
        <div className={styles['modalBody__content']}>{children}</div>
      </div>
    );
  },
);

ModalBody.displayName = 'ModalBody';
