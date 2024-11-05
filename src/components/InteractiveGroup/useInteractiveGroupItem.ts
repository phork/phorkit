import { useEffect } from 'react';
import { useScrollIntoView, UseScrollIntoViewProps } from './../../hooks/useScrollIntoView';

export type UseInteractiveGroupItemProps<E extends HTMLElement> = Omit<UseScrollIntoViewProps<E>, 'behavior'> & {
  disableScrollIntoView?: boolean;
  moveBrowserFocus?: boolean | ((props: { ref: React.MutableRefObject<E | null>; focused?: boolean }) => boolean);
  scrollBehavior?: UseScrollIntoViewProps<E>['behavior'];
};

/**
 * Accepts a ref and a focused flag and when that focused
 * flag changes to true this scrolls the ref element into
 * view and changes the active element to that ref element.
 */
export function useInteractiveGroupItem<E extends HTMLElement>({
  disableScrollIntoView = false,
  focused = false,
  moveBrowserFocus = false,
  ref,
  scrollBehavior,
}: UseInteractiveGroupItemProps<E>): void {
  useScrollIntoView<E>({ behavior: scrollBehavior, disabled: disableScrollIntoView, ref, focused });

  useEffect(() => {
    if (focused && document.activeElement !== ref.current) {
      const shouldMoveBrowserFocus =
        typeof moveBrowserFocus === 'function' ? moveBrowserFocus({ ref, focused }) : moveBrowserFocus;

      if (shouldMoveBrowserFocus) {
        ref.current?.focus();
      }
    }
  }, [focused, moveBrowserFocus, ref]);
}
