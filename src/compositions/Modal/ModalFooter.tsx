import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/Modal.module.css';
import { ModalProviderProps } from './ModalProvider';

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
}: ModalFooterProps): React.ReactElement<ModalProviderProps> {
  return (
    <div className={cx(styles.modalFooter, bordered && styles['modalFooter--bordered'], className)} {...props}>
      {children}
    </div>
  );
}

ModalFooter.displayName = 'ModalFooter';
