import { cx } from '@emotion/css';
import React from 'react';
import { ModalProviderProps } from './ModalProvider';
import styles from './styles/Modal.module.css';

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function ModalFooter({
  bordered = false,
  children,
  className,
  ...props
}: ModalFooterProps): React.ReactElement<ModalProviderProps, 'div'> {
  return (
    <div className={cx(styles.modalFooter, bordered && styles['modalFooter--bordered'], className)} {...props}>
      {children}
    </div>
  );
}

ModalFooter.displayName = 'ModalFooter';
