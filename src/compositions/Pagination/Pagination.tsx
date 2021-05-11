import React from 'react';
import { MergeProps, ThemeProps } from '../../types';
import { useComponentId } from '../../hooks/useComponentId';
import { useThemeId } from '../../hooks/useThemeId';
import { useTranslations, substituteTranslationArgs } from '../../hooks/useTranslations';
import { ButtonGroup, ButtonGroupItem, ButtonGroupProps, ButtonProps } from '../../components/Button';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { Flex, FlexProps } from '../../components/Flex/Flex';
import { Typography, TypographyProps } from '../../components/Typography/Typography';
import { PaginationEllipsis } from './PaginationEllipsis';
import { PaginationJump } from './PaginationJump';
import { PaginationJumpIcon } from './PaginationJumpIcon';
import { PaginationPage } from './PaginationPage';
import { usePagination } from './usePagination';

export type PaginationTranslations = {
  firstPageLabel: string;
  lastPageLabel: string;
  nextPageLabel: string;
  previousPageLabel: string;
  pageLabel: string;
  pageAndTotalLabel: string;
};

export const paginationsTranslations: PaginationTranslations = {
  firstPageLabel: 'First page',
  lastPageLabel: 'Last page',
  nextPageLabel: 'Next page',
  previousPageLabel: 'Previous page',
  pageLabel: 'Page {0}',
  pageAndTotalLabel: 'Page {0} of {1}',
};

type PaginationButtonProps = Pick<
  ButtonProps,
  | 'align'
  | 'className'
  | 'color'
  | 'fullWidth'
  | 'noHeight'
  | 'noPadding'
  | 'shape'
  | 'size'
  | 'unstyled'
  | 'unthemed'
  | 'weight'
>;

export interface LocalPaginationProps extends ThemeProps {
  activeProps: PaginationButtonProps;
  buttonGroupClassName?: ButtonGroupProps['className'];
  buttonGroupStyle?: ButtonGroupProps['style'];
  className?: FlexProps['className'];
  ellipsisProps?: PaginationButtonProps;
  getHref?: (page: number) => string;
  id?: string;
  inactiveProps: PaginationButtonProps;
  jumpProps?: PaginationButtonProps;
  justify?: 'start' | 'center' | 'end';
  onChangePage?: (page: number) => void;
  page: number;
  pageLabelProps?: TypographyProps;
  pageLinks?: number;
  pageSize: number;
  style?: FlexProps['style'];
  totalItems: number;
  translations?: PaginationTranslations;
  withEllipsis?: boolean;
  withFirstAndLast?: boolean;
  withIcons?: boolean;
  withPageAndTotalLabel?: boolean;
  withPageLabel?: boolean;
  withPageLinks?: boolean;
  withPreviousAndNext?: boolean;
}

export type PaginationProps = MergeProps<ButtonGroupProps, LocalPaginationProps>;

export function Pagination({
  activeProps,
  buttonGroupClassName,
  buttonGroupStyle,
  ellipsisProps,
  getHref,
  id,
  inactiveProps,
  jumpProps,
  justify = 'start',
  onChangePage,
  page,
  pageLabelProps,
  pageLinks = 0,
  pageSize,
  style,
  themeId: initThemeId,
  totalItems,
  translations: customTranslations,
  withEllipsis = false,
  withFirstAndLast = false,
  withIcons = false,
  withPageAndTotalLabel = false,
  withPageLabel = false,
  withPageLinks = false,
  withPreviousAndNext = false,
  ...props
}: PaginationProps) {
  const { generateComponentId } = useComponentId(id);
  const themeId = useThemeId(initThemeId);
  const translations = useTranslations({ customTranslations, fallbackTranslations: paginationsTranslations });
  const { pageLinksBefore, pageLinksAfter, pages } = usePagination({
    page,
    pageLinks,
    pageSize,
    totalItems,
    withEllipsis,
  });

  const { previousPageLabel, nextPageLabel, firstPageLabel, lastPageLabel } = translations;

  const justification: Record<'start' | 'center' | 'end', FlexProps['justifyContent']> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
  };

  const JumpButton = withIcons ? PaginationJumpIcon : PaginationJump;

  return (
    <ErrorBoundary>
      <Flex alignItems="center" direction="row" inflexible justifyContent={justification[justify]} wrap={false}>
        {(withPageLabel || withPageAndTotalLabel) && (
          <Typography size="s" variants={['letter-spacing-comfy']} {...pageLabelProps}>
            {substituteTranslationArgs(
              translations[withPageAndTotalLabel ? 'pageLabel' : 'pageAndTotalLabel'],
              page,
              pages,
            )}
          </Typography>
        )}

        <ButtonGroup
          buttons={[
            withFirstAndLast && {
              id: generateComponentId('firstPage'),
              label: (_selected: boolean) => (
                <JumpButton
                  disabled={page <= 1}
                  href={getHref ? getHref(1) : undefined}
                  onChangePage={onChangePage}
                  page={1}
                  themeId={themeId}
                  title={firstPageLabel}
                  type="first"
                  {...jumpProps}
                />
              ),
            },
            withPreviousAndNext && {
              id: generateComponentId('previousPage'),
              label: (_selected: boolean) => (
                <JumpButton
                  disabled={page <= 1}
                  href={getHref ? getHref(page - 1) : undefined}
                  onChangePage={onChangePage}
                  page={page - 1}
                  themeId={themeId}
                  title={previousPageLabel}
                  type="previous"
                  {...jumpProps}
                />
              ),
            },

            ...(withEllipsis && withPageLinks && pageLinksBefore[0] > 1 && page !== 1
              ? [
                  {
                    id: generateComponentId('page1'),
                    label: (_selected: boolean) => (
                      <PaginationPage href={getHref?.(1)} page={1} onChangePage={onChangePage} {...jumpProps} />
                    ),
                  },
                  pageLinksBefore[0] > 2 && {
                    id: generateComponentId('ellipsisBefore'),
                    label: (_selected: boolean) => <PaginationEllipsis {...ellipsisProps} />,
                  },
                ]
              : []),

            ...(withPageLinks && pageLinksBefore
              ? pageLinksBefore.map(i => ({
                  id: generateComponentId(`page${i}`),
                  label: (_selected: boolean) => (
                    <PaginationPage page={i} onChangePage={onChangePage} {...inactiveProps} />
                  ),
                }))
              : []),

            withPageLinks && {
              id: generateComponentId('activePage'),
              label: (_selected: boolean) => <PaginationPage active page={page} {...activeProps} />,
              selected: true,
            },

            ...(withPageLinks && pageLinksAfter
              ? pageLinksAfter.map(i => ({
                  id: generateComponentId(`page${i}`),
                  label: (_selected: boolean) => (
                    <PaginationPage page={i} onChangePage={onChangePage} {...inactiveProps} />
                  ),
                }))
              : []),

            ...(withEllipsis && withPageLinks && pageLinksAfter.slice(-1)[0] < pages - 1 && page !== pages
              ? [
                  pageLinksAfter.slice(-1)[0] < pages - 1 && {
                    id: generateComponentId('ellipsisAfter'),
                    label: (_selected: boolean) => <PaginationEllipsis {...ellipsisProps} />,
                  },
                  {
                    id: generateComponentId(`page${pages}`),
                    label: (_selected: boolean) => (
                      <PaginationPage page={pages} onChangePage={onChangePage} {...inactiveProps} />
                    ),
                  },
                ]
              : []),

            withPreviousAndNext && {
              id: generateComponentId('nextPage'),
              label: (_selected: boolean) => (
                <JumpButton
                  disabled={page >= pages}
                  href={getHref ? getHref(page + 1) : undefined}
                  onChangePage={onChangePage}
                  page={page + 1}
                  themeId={themeId}
                  title={nextPageLabel}
                  type="next"
                  {...jumpProps}
                />
              ),
            },
            withFirstAndLast && {
              id: generateComponentId('lastPage'),
              label: (_selected: boolean) => (
                <JumpButton
                  disabled={page >= pages}
                  href={getHref ? getHref(pages) : undefined}
                  onChangePage={onChangePage}
                  page={pages}
                  themeId={themeId}
                  title={lastPageLabel}
                  type="last"
                  {...jumpProps}
                />
              ),
            },
          ].filter((x): x is ButtonGroupItem => !!x)}
          className={buttonGroupClassName}
          style={buttonGroupStyle}
          {...props}
        />
      </Flex>
    </ErrorBoundary>
  );
}

Pagination.displayName = 'Pagination';
