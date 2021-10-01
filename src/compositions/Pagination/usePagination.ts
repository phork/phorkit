import produce from 'immer';
import { useRef } from 'react';

const getPageLinks = (start: number, count: number, increment: number, max: number, min: number = 1): number[] =>
  Array(count)
    .fill(null)
    .map((_, i) => start + (i + 1) * increment)
    .filter(i => i >= min && i <= max);

export interface UsePaginationProps {
  page: number;
  pageLinks: number;
  pageSize: number;
  totalItems: number;
  /** This will show "1 ..." before the page links and then "... [last page]" after them */
  withEllipsis?: boolean;
}

export type UsePaginationResponse = {
  pageLinksBefore: number[];
  pageLinksAfter: number[];
  pages: number;
};

export const usePagination = ({
  page,
  pageLinks,
  pageSize,
  totalItems,
  withEllipsis = false,
}: UsePaginationProps): UsePaginationResponse => {
  const previousResponse = useRef<UsePaginationResponse>({} as UsePaginationResponse);
  const pages = Math.ceil(totalItems / pageSize);

  const pageLinksSplit = {
    before: Math.ceil(pageLinks / 2),
    after: Math.floor(pageLinks / 2),
  };

  let pageLinksBefore = pageLinks
    ? getPageLinks(page, pageLinksSplit.before, -1, pages, Math.min(page, 1)).reverse()
    : [];

  let pageLinksAfter = pageLinks ? getPageLinks(page, pageLinksSplit.after, 1, pages, page + 1) : [];

  // if there aren't enough page links before then add some to the links after
  if (pageLinksBefore.length < pageLinksSplit.before) {
    pageLinksAfter = [
      ...pageLinksAfter,
      ...getPageLinks(
        pageLinksAfter.slice(-1)[0],
        pageLinksSplit.before - pageLinksBefore.length,
        1,
        pages - 1,
        page + 1,
      ),
    ];
  }

  // if there aren't enough page links after then add some to the links before
  if (pageLinksAfter.length < pageLinksSplit.after) {
    pageLinksBefore = [
      ...getPageLinks(
        pageLinksBefore[0],
        pageLinksSplit.after - pageLinksAfter.length,
        -1,
        pages,
        Math.min(page, 2),
      ).reverse(),
      ...pageLinksBefore,
    ];
  }

  // if the ellipsis would be between sequential numbers then just show the numbers
  if (withEllipsis) {
    if (pageLinksBefore[0] === 3) {
      pageLinksBefore.unshift(2);
    }

    if (pageLinksAfter.slice(-1)[0] + 2 === pages) {
      pageLinksAfter.push(pages - 1);
    }
  }

  previousResponse.current = produce(previousResponse.current, draftState => {
    draftState.pageLinksBefore = pageLinksBefore;
    draftState.pageLinksAfter = pageLinksAfter;
    draftState.pages = pages;
  });
  return previousResponse.current;
};
