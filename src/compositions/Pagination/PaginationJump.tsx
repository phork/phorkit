import React, { useCallback } from 'react';
import { AsReactType, MergeProps } from '../../types';
import { Button, ButtonElementType, ButtonProps } from '../../components/Button';

export interface LocalPaginationJumpProps {
  href?: string;
  onChangePage?: (page: number) => void;
  page: number;
  title: string;
  type: 'first' | 'last' | 'next' | 'previous';
}

export type PaginationJumpProps<T extends ButtonElementType = 'button'> = AsReactType<T> &
  MergeProps<Omit<ButtonProps<T>, 'as' | 'children'>, LocalPaginationJumpProps>;

export function PaginationJump<T extends ButtonElementType = 'button'>({
  as,
  href,
  onChangePage,
  page,
  title,
  type,
  ...props
}: PaginationJumpProps<T>): ReturnType<typeof Button> | null {
  const handleClick = useCallback(() => {
    onChangePage && onChangePage(page);
  }, [onChangePage, page]);

  return title ? (
    <Button<T> aria-label={title} as={as} href={href} onClick={handleClick} {...(props as ButtonProps<T>)}>
      {title}
    </Button>
  ) : null;
}

PaginationJump.displayName = 'PaginationJump';
