import { useEffect } from 'react';
import { useScrollIntoView, UseScrollIntoViewProps } from './../../hooks/useScrollIntoView';

export type UseInteractiveGroupItemProps<E extends HTMLElement> = Omit<UseScrollIntoViewProps<E>, 'behavior'> & {
  scrollBehavior?: UseScrollIntoViewProps<E>['behavior'];
  moveBrowserFocus?: boolean;
};

/**
 * Accepts a ref and a focused flag and when that focused
 * flag changes to true this scrolls the ref element into
 * view and changes the active element to that ref element.
 */
export function useInteractiveGroupItem<E extends HTMLElement>({
  focused = false,
  moveBrowserFocus = false,
  ref,
  scrollBehavior,
}: UseInteractiveGroupItemProps<E>): void {
  useScrollIntoView<E>({ behavior: scrollBehavior, ref, focused });

  useEffect(() => {
    if (moveBrowserFocus && focused && document.activeElement !== ref.current) {
      ref.current?.focus();
    }
  }, [focused, moveBrowserFocus, ref]);
}
