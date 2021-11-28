import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/Modal.module.css';

export type ModalFooterProps = React.HTMLAttributes<HTMLDivElement> & {
  bordered?: boolean;
  children?: React.ReactChild | React.ReactFragment | null;
  className?: string;
};

/**
 * The modal footer is generally used for submit
 * buttons and other navigation elements. When
 * rendered inside a `Modal` and as a sibling of a
 * `ModalBody` with the scrollable prop it sticks
 * to the bottom of the modal.
 */
export function ModalFooter({ bordered = false, children, className, ...props }: ModalFooterProps): JSX.Element {
  return (
    <div className={cx(styles.modalFooter, bordered && styles['modalFooter--bordered'], className)} {...props}>
      {children}
    </div>
  );
}

ModalFooter.displayName = 'ModalFooter';
