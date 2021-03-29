import produce from 'immer';
import { useRef } from 'react';

const getPageLinks = (start: number, count: number, increment: number, max: number, min: number = 1): number[] =>
  Array(count)
    .fill(null)
    .map((_, i) => start + (i + 1) * increment)
    .filter(i => i >= min && i <= max);

export interface UsePaginationInterface {
  page: number;
  pageLinks: number;
  pageSize: number;
  totalItems: number;
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
}: UsePaginationInterface): UsePaginationResponse => {
  const previousResponse = useRef<UsePaginationResponse>({} as UsePaginationResponse);
  const pages = Math.ceil(totalItems / pageSize);
  const pageLinksSplit = {
    before: Math.ceil(pageLinks / 2) + (page === 1 ? 1 : 0),
    after: Math.floor(pageLinks / 2) + (page === pages ? 1 : 0),
  };

  let pageLinksBefore = pageLinks
    ? getPageLinks(page, pageLinksSplit.before, -1, pages, Math.min(page, 2)).reverse()
    : [];
  let pageLinksAfter = pageLinks ? getPageLinks(page, pageLinksSplit.after, 1, pages - 1, page + 1) : [];

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

  previousResponse.current = produce(previousResponse.current, draftState => {
    draftState.pageLinksBefore = pageLinksBefore;
    draftState.pageLinksAfter = pageLinksAfter;
    draftState.pages = pages;
  });
  return previousResponse.current;
};
