import { cx } from '@emotion/css';
import React, { useCallback } from 'react';
import { AsReactType, MergeProps } from '../../types';
import { Button, ButtonElementType, ButtonProps } from '../../components/Button';
import styles from './styles/Pagination.module.css';

export type LocalPaginationJumpProps = {
  allowRightClickLinks?: boolean;
  href?: string;
  onChangePage?: (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent, page: number) => void;
  page: number;
  title: string;
  type: 'first' | 'last' | 'next' | 'previous';
};

export type PaginationJumpProps<T extends ButtonElementType = 'button'> = AsReactType<T> &
  MergeProps<Omit<ButtonProps<T>, 'as' | 'children'>, LocalPaginationJumpProps>;

/**
 * The pagination jump component renders a plain text
 * button or link to either the first page, last page,
 * previous page or next page.
 *
 * If an `href` property is passed it renders a link,
 * otherwise it renders a button. If `allowRightClickLinks`
 * is set then the page change should be handled by the
 * `onChangePage` handler while the link is reserved only
 * for right clicking.
 *
 * This uses the `Button` component.
 */
export function PaginationJump<T extends ButtonElementType = 'button'>({
  allowRightClickLinks,
  as,
  className,
  href,
  onChangePage,
  page,
  title,
  type,
  ...props
}: PaginationJumpProps<T>): ReturnType<typeof Button> | null {
  const handleClick = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent): void => {
      allowRightClickLinks && event.preventDefault();
      onChangePage && onChangePage(event, page);
    },
    [allowRightClickLinks, onChangePage, page],
  );

  return title ? (
    <Button<T>
      aria-label={title}
      className={cx(styles.paginationButton, styles['paginationButton--jump'], className)}
      href={href}
      onClick={handleClick}
      {...(props as ButtonProps<T>)}
      as={as}
    >
      {title}
    </Button>
  ) : null;
}

PaginationJump.displayName = 'PaginationJump';
