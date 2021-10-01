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

/**
 * The modal header renders a title, if passed, and
 * and other children content. When rendered inside
 * a Modal and as a sibling of a ModalBody with the
 * scrollable prop it sticks to the top of the modal.
 */
export function ModalHeader({
  align = 'center',
  bordered = false,
  children,
  className,
  modalId,
  title,
  ...props
}: ModalHeaderProps): React.ReactElement<ModalHeaderProps> {
  const { generateTitleId } = useModalComponentIds(modalId);

  return (
    <div className={cx(styles.modalHeader, bordered && styles['modalHeader--bordered'], className)} {...props}>
      {title && (
        <Typography<'div'>
          align={align}
          as="div"
          color="secondary"
          id={modalId ? generateTitleId() : undefined}
          size="3xlarge"
          weight="light"
        >
          {title}
        </Typography>
      )}

      {children}
    </div>
  );
}

ModalHeader.displayName = 'ModalHeader';
