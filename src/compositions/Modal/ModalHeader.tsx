import { cx } from '@emotion/css';
import React from 'react';
import { Typography } from '../../components/Typography/Typography';
import styles from './styles/Modal.module.css';
import { useModalComponentIds } from './useModalComponentIds';

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right';
  bordered?: boolean;
  children?: React.ReactNode;
  className?: string;
  modalId?: string;
  title?: string;
}

export function ModalHeader({
  align = 'center',
  bordered = false,
  children,
  className,
  modalId,
  title,
  ...props
}: ModalHeaderProps): React.ReactElement<ModalHeaderProps, 'div'> {
  const { generateTitleId } = useModalComponentIds(modalId);

  return (
    <div className={cx(styles.modalHeader, bordered && styles['modalHeader--bordered'], className)} {...props}>
      {title && (
        <Typography<'div'> align={align} as="div" color="secondary" id={generateTitleId()} size="xxxl" weight="light">
          {title}
        </Typography>
      )}

      {children}
    </div>
  );
}

ModalHeader.displayName = 'ModalHeader';
