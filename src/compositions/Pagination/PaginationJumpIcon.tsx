import React, { useCallback } from 'react';
import { AsReactType, MergeProps } from '../../types';
import { SvgIconProps } from '../../types/svgIcon';
import { ArrowDoubleLeftIcon } from '../../icons/ArrowDoubleLeftIcon';
import { ArrowDoubleRightIcon } from '../../icons/ArrowDoubleRightIcon';
import { ArrowLeftIcon } from '../../icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../../icons/ArrowRightIcon';
import { Button, ButtonElementType, ButtonProps } from '../../components/Button';
import { Rhythm } from '../../components/Rhythm/Rhythm';

const icons: Record<string, React.FC<SvgIconProps>> = {
  first: ArrowDoubleLeftIcon,
  last: ArrowDoubleRightIcon,
  next: ArrowRightIcon,
  previous: ArrowLeftIcon,
};

export interface LocalPaginationJumpIconProps {
  href?: string;
  onChangePage?: (page: number) => void;
  page: number;
  title: string;
  type: 'first' | 'last' | 'next' | 'previous';
}

export type PaginationJumpIconProps<T extends ButtonElementType = 'button'> = AsReactType<T> &
  MergeProps<Omit<ButtonProps<T>, 'as' | 'children'>, LocalPaginationJumpIconProps>;

/** This uses a regular Button instead of an IconButton because it's easier to standardize props */
export function PaginationJumpIcon<T extends ButtonElementType = 'button'>({
  as,
  href,
  onChangePage,
  page,
  title,
  type,
  ...props
}: PaginationJumpIconProps<T>): ReturnType<typeof Button> | null {
  const Icon = type ? icons[type] : undefined;

  const handleClick = useCallback(() => {
    onChangePage && onChangePage(page);
  }, [onChangePage, page]);

  return Icon ? (
    <Button<T> noPadding aria-label={title} as={as} href={href} onClick={handleClick} {...(props as ButtonProps<T>)}>
      <Rhythm mx={2}>
        <Icon scale="small" title={title} />
      </Rhythm>
    </Button>
  ) : null;
}

PaginationJumpIcon.displayName = 'PaginationJumpIcon';
