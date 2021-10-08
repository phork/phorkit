import { cx } from '@emotion/css';
import React, { useCallback } from 'react';
import { AsReactType, MergeProps } from '../../types';
import { SvgIconProps } from '../../types/svgIcon';
import { ArrowDoubleLeftIcon } from '../../icons/ArrowDoubleLeftIcon';
import { ArrowDoubleRightIcon } from '../../icons/ArrowDoubleRightIcon';
import { ArrowLeftIcon } from '../../icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../../icons/ArrowRightIcon';
import { Button, ButtonElementType, ButtonProps } from '../../components/Button';
import { Rhythm } from '../../components/Rhythm/Rhythm';
import styles from './styles/Pagination.module.css';

const icons: Record<string, React.FC<SvgIconProps>> = {
  first: ArrowDoubleLeftIcon,
  last: ArrowDoubleRightIcon,
  next: ArrowRightIcon,
  previous: ArrowLeftIcon,
};

export type LocalPaginationJumpIconProps = {
  allowRightClickLinks?: boolean;
  href?: string;
  onChangePage?: (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent, page: number) => void;
  page: number;
  title: string;
  type: 'first' | 'last' | 'next' | 'previous';
};

export type PaginationJumpIconProps<T extends ButtonElementType = 'button'> = AsReactType<T> &
  MergeProps<Omit<ButtonProps<T>, 'as' | 'children'>, LocalPaginationJumpIconProps>;

/**
 * The pagination jump component renders an SVG icon
 * button or link to either the first page, last page,
 * previous page or next page.
 *
 * If an `href` property is passed it renders a link,
 * otherwise it renders a button. If `allowRightClickLinks`
 * is set then the page change should be handled by the
 * `onChangePage` handler while the link is reserved only
 * for right clicking.
 *
 * This uses a regular `Button` instead of an `IconButton`
 * because it makes it easier to standardize props.
 *
 * This uses the `Button` and `Rhythm` components.
 */
export function PaginationJumpIcon<T extends ButtonElementType = 'button'>({
  allowRightClickLinks,
  as,
  className,
  href,
  onChangePage,
  page,
  title,
  type,
  ...props
}: PaginationJumpIconProps<T>): ReturnType<typeof Button> | null {
  const Icon = type ? icons[type] : undefined;

  const handleClick = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent): void => {
      allowRightClickLinks && event.preventDefault();
      onChangePage && onChangePage(event, page);
    },
    [allowRightClickLinks, onChangePage, page],
  );

  return Icon ? (
    <Button<T>
      noPadding
      aria-label={title}
      className={cx(styles.paginationButton, styles['paginationButton--jumpIcon'], className)}
      href={href}
      onClick={handleClick}
      {...(props as ButtonProps<T>)}
      as={as}
    >
      <Rhythm mx={2}>
        <Icon scale="small" title={title} />
      </Rhythm>
    </Button>
  ) : null;
}

PaginationJumpIcon.displayName = 'PaginationJumpIcon';
