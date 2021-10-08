import { useCallback, useMemo, useRef } from 'react';

export type UseFocusReturnResponse<T> = {
  changeFocus: (element: T | undefined) => T | undefined;
  returnFocus: () => void;
};

/**
 * Returns a `changeFocus` function to change the active
 * element, and a `returnFocus` function to return the
 * focus to the element that was active when `changeFocus`
 * was called.
 */
export function useFocusReturn<T extends HTMLElement = HTMLElement>(): UseFocusReturnResponse<T> {
  const initialFocus = useRef<HTMLElement>();

  const changeFocus = useCallback<UseFocusReturnResponse<T>['changeFocus']>(element => {
    if (element && element instanceof HTMLElement) {
      if (document?.activeElement && 'focus' in document.activeElement) {
        initialFocus.current = document.activeElement;
      }
      element.focus();
      return element;
    }

    initialFocus.current = undefined;
    return undefined;
  }, []);

  const returnFocus = useCallback<UseFocusReturnResponse<T>['returnFocus']>(() => {
    if (initialFocus.current) {
      initialFocus.current.focus();
      return initialFocus.current;
    }
    return undefined;
  }, []);

  return useMemo(
    () => ({
      changeFocus,
      returnFocus,
    }),
    [changeFocus, returnFocus],
  );
}
