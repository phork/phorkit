import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/Modal.module.css';

export type ModalBodyProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactChild | React.ReactFragment;
  className?: string;
  flush?: boolean;
  scrollable?: boolean;
  style?: React.CSSProperties;
};

/**
 * The modal body wraps the content with a scrollable
 * container and adds the appropriate padding.
 */
export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  (
    { children, className, flush = false, scrollable = false, style, ...props },
    forwardedRef: React.ForwardedRef<HTMLDivElement>,
  ): React.ReactElement<ModalBodyProps> => {
    return (
      <div
        className={cx(
          styles.modalBody,
          flush && styles['modalBody--flush'],
          scrollable && styles['modalBody--scrollable'],
          className,
        )}
        ref={forwardedRef}
        style={style}
        {...props}
      >
        <div className={styles['modalBody__content']}>{children}</div>
      </div>
    );
  },
);

ModalBody.displayName = 'ModalBody';
