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
  | 'style'
  | 'unstyled'
  | 'weight'
> & {
  width?: number | string;
};

export type PaginationLimitedProps = Record<string, unknown>;

export type LocalPaginationProps = MergeProps<
  Omit<ThemeProps, 'unthemed'>,
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
    spacing?: ButtonGroupProps['spacing'] | null;
    style?: FlexProps['style'];
    /** The total number of items (used to calculate number of pages) */
    totalItems: number;
    translations?: Partial<PaginationTranslations>;
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

export type PaginationProps = MergeProps<
  Omit<
    ButtonGroupProps,
    | 'align'
    | 'buttons'
    | 'children'
    | 'display'
    | 'fullWidth'
    | 'onClick'
    | 'orientation'
    | 'selectedColor'
    | 'selectedStyle'
    | 'selectedWeight'
  >,
  LocalPaginationProps
>;

export const defaultActivePageProps = {
  weight: 'solid' as ButtonProps['weight'],
};

export const defaultPageLabelProps = {
  size: 'medium' as TypographyProps['size'],
  variants: 'no-wrap' as TypographyProps['variants'],
};

/**
 * The pagination component receives `pageSize` and
 * `totalItems` props and uses those values to calculate
 * and display buttons or links to change pages.
 *
 * The current page state should be stored outside of
 * this component and is updated by the `onChangePage`
 * callback.
 *
 * This uses the `Button`, `ButtonGroup`, `ErrorBoundary`,
 * `Flex`, and `Typography` components.
 */
export function Pagination({
  activePageProps = defaultActivePageProps,
  allowRightClickLinks,
  buttonGroupClassName,
  buttonGroupStyle,
  className,
  color,
  contrast,
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
  shape = 'brick',
  size,
  spacing = 'joined',
  style,
  themeId: initThemeId,
  totalItems,
  translations: customTranslations,
  weight = 'shaded',
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
  const translations = useTranslations<PaginationTranslations>({
    customTranslations,
    fallbackTranslations: paginationTranslations,
  });
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
      <Flex
        inflexible
        alignItems="center"
        className={className}
        direction="row"
        justifyContent={justification[justify]}
        wrap={false}
      >
        {(withPageLabel || withPageAndTotalLabel) && (
          <Typography<'div'> as="div" color={contrast ? 'contrast' : 'primary'} {...pageLabelProps}>
            {substituteTranslationArgs(
              translations[withPageAndTotalLabel ? 'pageAndTotalLabel' : 'pageLabel'],
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
                      color={color}
                      contrast={contrast}
                      disabled={page <= 1}
                      href={getHref ? getHref(1) : undefined}
                      onChangePage={onChangePage}
                      page={1}
                      shape={shape}
                      size={size}
                      themeId={themeId}
                      title={firstPageLabel}
                      type="first"
                      weight={weight}
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
                      color={color}
                      contrast={contrast}
                      disabled={page <= 1}
                      href={getHref ? getHref(page - 1) : undefined}
                      onChangePage={onChangePage}
                      page={page - 1}
                      shape={shape}
                      size={size}
                      themeId={themeId}
                      title={previousPageLabel}
                      type="previous"
                      weight={weight}
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
                          color={color}
                          contrast={contrast}
                          href={getHref?.(1)}
                          onChangePage={onChangePage}
                          page={1}
                          shape={shape}
                          size={size}
                          weight={weight}
                          {...jumpProps}
                        />
                      ),
                    } as ButtonGroupItem,
                    pageLinksBefore[0] > 2 &&
                      ({
                        id: generateComponentId('ellipsisBefore'),
                        label: () => (
                          <PaginationEllipsis
                            color={color}
                            contrast={contrast}
                            shape={shape}
                            size={size}
                            weight={weight}
                            {...ellipsisProps}
                          />
                        ),
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
                            color={color}
                            contrast={contrast}
                            href={getHref?.(i)}
                            onChangePage={onChangePage}
                            page={i}
                            shape={shape}
                            size={size}
                            weight={weight}
                            {...pageProps}
                          />
                        ),
                      } as ButtonGroupItem),
                  )
                : []),

              withPageLinks &&
                ({
                  id: generateComponentId('activePage'),
                  label: () => (
                    <PaginationPage<'div'>
                      active
                      imitation
                      as="div"
                      color={color}
                      contrast={contrast}
                      page={page}
                      shape={shape}
                      size={size}
                      weight={weight}
                      {...activePageProps}
                    />
                  ),
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
                            color={color}
                            contrast={contrast}
                            href={getHref?.(i)}
                            onChangePage={onChangePage}
                            page={i}
                            shape={shape}
                            size={size}
                            weight={weight}
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
                        label: () => (
                          <PaginationEllipsis
                            color={color}
                            contrast={contrast}
                            shape={shape}
                            size={size}
                            weight={weight}
                            {...ellipsisProps}
                          />
                        ),
                      } as ButtonGroupItem),
                    {
                      id: generateComponentId(`page${pages}`),
                      label: () => (
                        <PaginationPage
                          allowRightClickLinks={allowRightClickLinks}
                          color={color}
                          contrast={contrast}
                          onChangePage={onChangePage}
                          page={pages}
                          shape={shape}
                          size={size}
                          weight={weight}
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
                      color={color}
                      contrast={contrast}
                      disabled={page >= pages}
                      href={getHref ? getHref(page + 1) : undefined}
                      onChangePage={onChangePage}
                      page={page + 1}
                      shape={shape}
                      size={size}
                      themeId={themeId}
                      title={nextPageLabel}
                      type="next"
                      weight={weight}
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
                      color={color}
                      contrast={contrast}
                      disabled={page >= pages}
                      href={getHref ? getHref(pages) : undefined}
                      onChangePage={onChangePage}
                      page={pages}
                      shape={shape}
                      size={size}
                      themeId={themeId}
                      title={lastPageLabel}
                      type="last"
                      weight={weight}
                      {...jumpProps}
                    />
                  ),
                } as ButtonGroupItem),
            ].filter((x): x is ButtonGroupItem => !!x)}
            className={buttonGroupClassName}
            color={color}
            contrast={contrast}
            shape={shape}
            size={size}
            spacing={spacing || undefined}
            style={buttonGroupStyle}
            weight={weight}
            {...props}
          />
        )}
      </Flex>
    </ErrorBoundary>
  );
}

Pagination.displayName = 'Pagination';
