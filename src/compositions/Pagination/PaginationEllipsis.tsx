import { cx } from '@emotion/css';
import React from 'react';
import { EllipsisIcon } from '../../icons';
import { Button, ButtonProps } from '../../components/Button';
import styles from './styles/Pagination.module.css';

export type PaginationEllipsisProps = Omit<ButtonProps<'div'>, 'as' | 'children'>;

/**
 * The pagination ellipsis component renders an ellipsis
 * icon. This uses an unclickable imitation `Button` which
 * makes it easier to share styles with the rest of the
 * pagination buttons.
 *
 * This uses the `Button` component.
 */
export function PaginationEllipsis({ className, ...props }: PaginationEllipsisProps): ReturnType<typeof Button> | null {
  return (
    <Button<'div'>
      disabled
      imitation
      noPadding
      className={cx(styles.paginationButton, styles['paginationButton--ellipsis'], className)}
      {...(props as ButtonProps<'div'>)}
      as="div"
    >
      <EllipsisIcon scale="small" />
    </Button>
  );
}

PaginationEllipsis.displayName = 'PaginationEllipsis';
