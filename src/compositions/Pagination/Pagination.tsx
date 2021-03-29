import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { useTranslations } from '../../hooks/useTranslations';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { Flex, FlexProps } from '../../components/Flex/Flex';
import { Rhythm } from '../../components/Rhythm/Rhythm';
import { Typography } from '../../components/Typography/Typography';
import { PaginationEllipsis } from './PaginationEllipsis';
import { PaginationJump } from './PaginationJump';
import { PaginationPage } from './PaginationPage';
import { usePagination } from './usePagination';

export type PaginationTranslations = {
  firstPageLabel: string;
  lastPageLabel: string;
  nextPageLabel: string;
  previousPageLabel: string;
};

export const paginationsTranslations: PaginationTranslations = {
  firstPageLabel: 'First page',
  lastPageLabel: 'Last page',
  nextPageLabel: 'Next page',
  previousPageLabel: 'Previous page',
};

export interface PaginationProps extends ThemeProps {
  getHref?: (page: number) => string;
  justify?: 'start' | 'center' | 'end';
  onChangePage?: (page: number) => void;
  page: number;
  pageLinks?: number;
  pageSize: number;
  totalItems: number;
  translations?: PaginationTranslations;
  withFirstAndLast?: boolean;
  withPageLabel?: boolean;
  withPreviousAndNext?: boolean;
}

export function Pagination({
  getHref,
  justify = 'start',
  onChangePage,
  page,
  pageLinks = 0,
  pageSize,
  themeId: initThemeId,
  totalItems,
  translations: customTranslations,
  withFirstAndLast,
  withPageLabel,
  withPreviousAndNext,
}: PaginationProps) {
  const themeId = useThemeId(initThemeId);
  const translations = useTranslations({ customTranslations, fallbackTranslations: paginationsTranslations });
  const { pageLinksBefore, pageLinksAfter, pages } = usePagination({ page, pageLinks, pageSize, totalItems });
  const { previousPageLabel, nextPageLabel, firstPageLabel, lastPageLabel } = translations;

  const justification: Record<'start' | 'center' | 'end', FlexProps['justifyContent']> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
  };

  return (
    <ErrorBoundary>
      <Flex alignItems="center" direction="row" inflexible justifyContent={justification[justify]} wrap={false}>
        {withFirstAndLast && (
          <Rhythm mr={1}>
            <PaginationJump
              disabled={page <= 1}
              href={getHref ? getHref(1) : undefined}
              onChangePage={onChangePage}
              page={1}
              themeId={themeId}
              title={firstPageLabel}
              type="first"
            />
          </Rhythm>
        )}

        {withPreviousAndNext && (
          <Rhythm mr={1}>
            <PaginationJump
              disabled={page <= 1}
              href={getHref ? getHref(page - 1) : undefined}
              onChangePage={onChangePage}
              page={page - 1}
              themeId={themeId}
              title={previousPageLabel}
              type="previous"
            />
          </Rhythm>
        )}

        {withPageLabel && (
          <Rhythm m={2}>
            <Typography size="xs" weight="bold" variants={['letter-spacing-comfy', 'uppercase']} volume="quieter">
              {`Page ${page}`}
            </Typography>
          </Rhythm>
        )}

        {!!pageLinks && pages > 1 && (
          <Flex alignItems="center" justifyContent="center">
            <Rhythm p={1}>
              {page !== 1 && <PaginationPage href={getHref?.(1)} key="first" page={1} onChangePage={onChangePage} />}
            </Rhythm>
            {pageLinksBefore[0] > 2 && page !== 2 && (
              <Rhythm mx={1}>
                <PaginationEllipsis key="moreBefore" />
              </Rhythm>
            )}

            <Rhythm p={1}>
              {pageLinksBefore &&
                pageLinksBefore.map(i => <PaginationPage key={i} page={i} onChangePage={onChangePage} />)}

              <PaginationPage active page={page} />

              {pageLinksAfter &&
                pageLinksAfter.map(i => <PaginationPage key={i} page={i} onChangePage={onChangePage} />)}
            </Rhythm>

            {pageLinksAfter.slice(-1)[0] < pages - 1 && page !== pages && (
              <Rhythm mx={1}>
                <PaginationEllipsis key="moreAfter" />
              </Rhythm>
            )}

            <Rhythm p={1}>
              {page !== pages && <PaginationPage key="last" page={pages} onChangePage={onChangePage} />}
            </Rhythm>
          </Flex>
        )}

        {withPreviousAndNext && (
          <Rhythm ml={1}>
            <PaginationJump
              disabled={page >= pages}
              href={getHref ? getHref(page + 1) : undefined}
              onChangePage={onChangePage}
              page={page + 1}
              themeId={themeId}
              title={nextPageLabel}
              type="next"
            />
          </Rhythm>
        )}

        {withFirstAndLast && (
          <Rhythm ml={1}>
            <PaginationJump
              disabled={page >= pages}
              href={getHref ? getHref(pages) : undefined}
              onChangePage={onChangePage}
              page={pages}
              themeId={themeId}
              title={lastPageLabel}
              type="last"
            />
          </Rhythm>
        )}
      </Flex>
    </ErrorBoundary>
  );
}
