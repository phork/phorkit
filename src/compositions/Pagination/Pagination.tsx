import React from 'react';
import { MergeProps, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { useComponentId } from '../../hooks/useComponentId';
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

export const paginationTranslations: PaginationTranslations = {
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

export type PaginationLimitedProps = {};

export type LocalPaginationProps = MergeProps<
  ThemeProps,
  {
    /** The props for the active page button */
    activePageProps: PaginationButtonProps;
    /** This will make each page a link only for the purpose of right clicking; it still uses an onClick event */
    allowRightClickLinks?: boolean;
    buttonGroupClassName?: ButtonGroupProps['className'];
    buttonGroupStyle?: ButtonGroupProps['style'];
    className?: FlexProps['className'];
    /** The props for the ellipsis div elements */
    ellipsisProps?: PaginationButtonProps;
    /** An optional function to return a link to the page */
    getHref?: (page: number) => string;
    id?: string;
    /** The props for the jump (arrow) buttons */
    jumpProps?: PaginationButtonProps;
    justify?: 'start' | 'center' | 'end';
    onChangePage?: (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent, page: number) => void;
    /** The current page */
    page: number;
    /** The props for the "Page X of Y" label */
    pageLabelProps?: Omit<TypographyProps<'div'>, 'as'>;
    /** The total number of page links to display excluding the current page, the jump buttons and the ellipsis pages */
    pageLinks?: number;
    /** The props for the page link buttons */
    pageProps: PaginationButtonProps;
    /** The number of items per page (use to calculate number of pages) */
    pageSize: number;
    style?: FlexProps['style'];
    /** The total number of items (used to calculate number of pages) */
    totalItems: number;
    translations?: PaginationTranslations;
    /** Show "[1] ..." and "... [n]" buttons */
    withEllipsis?: boolean;
    /** Show "First page" and "Last page" buttons */
    withFirstAndLast?: boolean;
    /** Use icon buttons instead of text buttons for all jump buttons */
    withIcons?: boolean;
    /** Show a "Page X of Y" label */
    withPageAndTotalLabel?: boolean;
    /** Show a "Page X" label */
    withPageLabel?: boolean;
    /** Show page number buttons before and after the current page */
    withPageLinks?: boolean;
    /** Show "Previous page" and "Next page" buttons */
    withPreviousAndNext?: boolean;
  }
>;

export type PaginationProps = MergeProps<ButtonGroupProps, LocalPaginationProps>;

const defaultPageLabelProps = {
  size: 'medium' as TypographyProps['size'],
  variants: 'no-wrap' as TypographyProps['variants'],
};

/**
 * The pagination component receives pageSize and
 * totalItems props and uses those values to calculate
 * and display buttons or links to change pages.
 *
 * The current page state should be stored outside of
 * this component and is updated by the onChangePage
 * callback.
 */
export function Pagination({
  activePageProps,
  allowRightClickLinks,
  buttonGroupClassName,
  buttonGroupStyle,
  ellipsisProps,
  getHref,
  id,
  jumpProps,
  justify = 'start',
  onChangePage,
  page,
  pageLabelProps = defaultPageLabelProps,
  pageLinks = 0,
  pageProps,
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
  const translations = useTranslations({ customTranslations, fallbackTranslations: paginationTranslations });
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
      <Flex inflexible alignItems="center" direction="row" justifyContent={justification[justify]} wrap={false}>
        {(withPageLabel || withPageAndTotalLabel) && (
          <Typography<'div'> as="div" {...pageLabelProps}>
            {substituteTranslationArgs(
              translations[withPageAndTotalLabel ? 'pageLabel' : 'pageAndTotalLabel'],
              page,
              pages,
            )}
          </Typography>
        )}

        {(withFirstAndLast || withPreviousAndNext || withPageLinks) && (
          <ButtonGroup
            buttons={[
              withFirstAndLast &&
                ({
                  id: generateComponentId('firstPage'),
                  label: () => (
                    <JumpButton
                      allowRightClickLinks={allowRightClickLinks}
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
                } as ButtonGroupItem),
              withPreviousAndNext &&
                ({
                  id: generateComponentId('previousPage'),
                  label: () => (
                    <JumpButton
                      allowRightClickLinks={allowRightClickLinks}
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
                } as ButtonGroupItem),

              ...(withEllipsis && withPageLinks && pageLinksBefore[0] > 1 && page !== 1
                ? [
                    {
                      id: generateComponentId('page1'),
                      label: () => (
                        <PaginationPage
                          allowRightClickLinks={allowRightClickLinks}
                          href={getHref?.(1)}
                          onChangePage={onChangePage}
                          page={1}
                          {...jumpProps}
                        />
                      ),
                    } as ButtonGroupItem,
                    pageLinksBefore[0] > 2 &&
                      ({
                        id: generateComponentId('ellipsisBefore'),
                        label: () => <PaginationEllipsis {...ellipsisProps} />,
                      } as ButtonGroupItem),
                  ]
                : []),

              ...(withPageLinks && pageLinksBefore
                ? pageLinksBefore.map(
                    i =>
                      ({
                        id: generateComponentId(`page${i}`),
                        label: () => (
                          <PaginationPage
                            allowRightClickLinks={allowRightClickLinks}
                            href={getHref?.(i)}
                            onChangePage={onChangePage}
                            page={i}
                            {...pageProps}
                          />
                        ),
                      } as ButtonGroupItem),
                  )
                : []),

              withPageLinks &&
                ({
                  id: generateComponentId('activePage'),
                  label: () => <PaginationPage<'div'> active imitation as="div" page={page} {...activePageProps} />,
                  selected: true,
                } as ButtonGroupItem),

              ...(withPageLinks && pageLinksAfter
                ? pageLinksAfter.map(
                    i =>
                      ({
                        id: generateComponentId(`page${i}`),
                        label: () => (
                          <PaginationPage
                            allowRightClickLinks={allowRightClickLinks}
                            href={getHref?.(i)}
                            onChangePage={onChangePage}
                            page={i}
                            {...pageProps}
                          />
                        ),
                      } as ButtonGroupItem),
                  )
                : []),

              ...(withEllipsis && withPageLinks && pageLinksAfter.slice(-1)[0] < pages - 1 && page !== pages
                ? [
                    pageLinksAfter.slice(-1)[0] < pages - 1 &&
                      ({
                        id: generateComponentId('ellipsisAfter'),
                        label: () => <PaginationEllipsis {...ellipsisProps} />,
                      } as ButtonGroupItem),
                    {
                      id: generateComponentId(`page${pages}`),
                      label: () => (
                        <PaginationPage
                          allowRightClickLinks={allowRightClickLinks}
                          onChangePage={onChangePage}
                          page={pages}
                          {...pageProps}
                        />
                      ),
                    } as ButtonGroupItem,
                  ]
                : []),

              withPreviousAndNext &&
                ({
                  id: generateComponentId('nextPage'),
                  label: () => (
                    <JumpButton
                      allowRightClickLinks={allowRightClickLinks}
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
                } as ButtonGroupItem),
              withFirstAndLast &&
                ({
                  id: generateComponentId('lastPage'),
                  label: () => (
                    <JumpButton
                      allowRightClickLinks={allowRightClickLinks}
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
                } as ButtonGroupItem),
            ].filter((x): x is ButtonGroupItem => !!x)}
            className={buttonGroupClassName}
            style={buttonGroupStyle}
            {...props}
          />
        )}
      </Flex>
    </ErrorBoundary>
  );
}

Pagination.displayName = 'Pagination';
