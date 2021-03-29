import { cx } from '@emotion/css';
import React from 'react';
import { Typography } from '../../components/Typography/Typography';
import styles from './styles/Modal.module.css';
import { useModalComponentIds } from './useModalComponentIds';

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
  className?: string;
  modalId?: string;
  title?: string;
}

export function ModalHeader({
  align = 'center',
  children,
  className,
  modalId,
  title,
  ...props
}: ModalHeaderProps): React.ReactElement<ModalHeaderProps, 'div'> {
  const { generateTitleId } = useModalComponentIds(modalId);

  return (
    <div className={cx(styles.modalHeader, className)} {...props}>
      {title && (
        <Typography id={generateTitleId()} align={align} as="div" color="secondary" size="xxl" weight="light">
          {title}
        </Typography>
      )}

      {children}
    </div>
  );
}
