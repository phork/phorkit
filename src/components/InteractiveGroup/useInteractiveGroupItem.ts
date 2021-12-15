import { useEffect, useRef } from 'react';
import { useScrollIntoView, UseScrollIntoViewProps } from './../../hooks/useScrollIntoView';

export type UseInteractiveGroupItemProps<E extends HTMLElement> = Omit<UseScrollIntoViewProps<E>, 'behavior'> & {
  scrollBehavior?: UseScrollIntoViewProps<E>['behavior'];
};

/**
 * Accepts a ref and a focused flag and when that focused
 * flag changes to true this scrolls the ref element into
 * view and changes the active element to that ref element.
 */
export function useInteractiveGroupItem<E extends HTMLElement>({
  focused = false,
  ref,
  scrollBehavior,
}: UseInteractiveGroupItemProps<E>) {
  const previous = useRef<boolean | undefined>(false);
  useScrollIntoView<E>({ behavior: scrollBehavior, ref, focused });

  /**
   * Steal focus away from whatever child element may have
   * it and put it at the top level, but don't steal focus
   * away if the focus is on a parent element.
   *
   * This must check that previous.current.focused has been
   * set so it doesn't run on initialization.
   */
  useEffect(() => {
    if (focused !== previous.current && previous.current !== undefined) {
      if (focused && ref.current && ref.current.querySelectorAll(':focus').length === 1) {
        ref.current.focus();
      }
    }
    previous.current = !!focused;
  }, [focused, ref]);
}
