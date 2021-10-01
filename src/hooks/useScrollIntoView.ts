import { useLayoutEffect, useRef } from 'react';

export type UseScrollIntoViewProps = {
  focused?: boolean;
  ref: React.MutableRefObject<HTMLElement | null>;
};

/**
 * Accepts a ref and a focused flag and when that focused
 * flag changes to true this scrolls the ref element into
 * view.
 */
export function useScrollIntoView({ focused = false, ref }: UseScrollIntoViewProps): void {
  const previous = useRef<boolean | undefined>(undefined);

  // make sure focused has previously been set so this doesn't scroll the whole page to this element on load
  useLayoutEffect((): void => {
    if (focused && previous.current !== undefined) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
    previous.current = !!focused;
  }, [focused, ref]);
}
