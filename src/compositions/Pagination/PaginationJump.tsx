import React, { useCallback } from 'react';
import { AsType, MergeProps } from '../../types';
import { SvgIconProps } from '../../types/svgIcon';
import { ArrowDoubleLeftIcon } from '../../icons/ArrowDoubleLeftIcon';
import { ArrowDoubleRightIcon } from '../../icons/ArrowDoubleRightIcon';
import { ArrowLeftIcon } from '../../icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../../icons/ArrowRightIcon';
import { IconButton, IconButtonElementType, IconButtonProps } from '../../components/Button/IconButton';

const icons: Record<string, React.FC<SvgIconProps>> = {
  first: ArrowDoubleLeftIcon,
  last: ArrowDoubleRightIcon,
  next: ArrowRightIcon,
  previous: ArrowLeftIcon,
};

export interface LocalPaginationJumpProps {
  href?: string;
  onChangePage?: (page: number) => void;
  page: number;
  title?: string;
  type: 'first' | 'last' | 'next' | 'previous';
}

export type PaginationJumpProps<T extends IconButtonElementType = 'button'> = AsType<T> &
  MergeProps<Omit<IconButtonProps<T>, 'as' | 'children'>, LocalPaginationJumpProps>;

export function PaginationJump<T extends IconButtonElementType = 'button'>({
  as,
  href,
  onChangePage,
  page,
  title,
  type,
  ...props
}: PaginationJumpProps<T>): ReturnType<typeof IconButton> | null {
  const Icon = type ? icons[type] : undefined;

  const handleClick = useCallback(() => {
    onChangePage && onChangePage(page);
  }, [onChangePage, page]);

  return Icon ? (
    <IconButton<T>
      as={as}
      color="neutral"
      href={href}
      onClick={handleClick}
      aria-label={title}
      {...((props as unknown) as IconButtonProps<T>)}
    >
      <Icon title={title} scale="small" />
    </IconButton>
  ) : null;
}
