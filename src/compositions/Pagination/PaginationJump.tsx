import React, { useCallback } from 'react';
import { AsReactType, MergeProps } from '../../types';
import { Button, ButtonElementType, ButtonProps } from '../../components/Button';

export interface LocalPaginationJumpProps {
  allowRightClickLinks?: boolean;
  href?: string;
  onChangePage?: (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent, page: number) => void;
  page: number;
  title: string;
  type: 'first' | 'last' | 'next' | 'previous';
}

export type PaginationJumpProps<T extends ButtonElementType = 'button'> = AsReactType<T> &
  MergeProps<Omit<ButtonProps<T>, 'as' | 'children'>, LocalPaginationJumpProps>;

export function PaginationJump<T extends ButtonElementType = 'button'>({
  allowRightClickLinks,
  as,
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
    <Button<T> aria-label={title} href={href} onClick={handleClick} {...(props as ButtonProps<T>)} as={as}>
      {title}
    </Button>
  ) : null;
}

PaginationJump.displayName = 'PaginationJump';
