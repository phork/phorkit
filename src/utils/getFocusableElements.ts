import { getTabIndex } from './getTabIndex';
import { isElementFocusable } from './isElementFocusable';

/** This allows for a null parent so that it can be easily used with refs */
export const isFocusWithin = (parent: HTMLElement | null): boolean =>
  !!(parent && parent.contains(document.activeElement));

export const getFocusableElements = (initParent?: HTMLElement): HTMLElement[] | undefined => {
  const parent = initParent || document?.body;
  return parent ? [].slice.call(parent.querySelectorAll('*'), 0).filter(isElementFocusable) : undefined;
};

export const getSortedFocusableElements = (initParent: HTMLElement): HTMLElement[] | undefined => {
  const focusableElements = getFocusableElements(initParent);
  const elements =
    focusableElements &&
    focusableElements
      .map((element, i) => ({ element, order: i, tabIndex: getTabIndex(element) }))
      .sort((a, b) => {
        if (a.tabIndex === b.tabIndex) return a.order - b.order;
        if (!a.tabIndex) return 1; // tabIndex of 0 or undefined; sort 0 last so put b first
        if (!b.tabIndex) return -1; // tabIndex of 0 or undefined; sort 0 last so put a first
        return a.tabIndex - b.tabIndex;
      });
  return elements ? elements.map(({ element }) => element) : [];
};

export const getFirstFocusableElement = (initParent: HTMLElement): HTMLElement | undefined =>
  getSortedFocusableElements(initParent)?.[0];

export const getLastFocusableElement = (initParent: HTMLElement): HTMLElement | undefined =>
  getSortedFocusableElements(initParent)?.slice(-1)[0];

export const getPreviousFocusableElement = (initParent: HTMLElement): HTMLElement | undefined => {
  const elements = getSortedFocusableElements(initParent);
  if (elements) {
    const currentIndex = elements?.findIndex(element => document.activeElement === element || isFocusWithin(element));

    if (currentIndex === -1) {
      return elements[0];
    } else if (currentIndex === 0) {
      return elements.slice(-1)[0];
    } else {
      return elements[currentIndex - 1];
    }
  }
  return undefined;
};

export const getNextFocusableElement = (initParent: HTMLElement): HTMLElement | undefined => {
  const elements = getSortedFocusableElements(initParent);
  if (elements) {
    const currentIndex = elements?.findIndex(element => document.activeElement === element || isFocusWithin(element));

    if (currentIndex === -1 || currentIndex === elements.length - 1) {
      return elements[0];
    } else {
      return elements[currentIndex + 1];
    }
  }
  return undefined;
};
