import { useLayoutEffect, useRef } from 'react';

export interface UseScrollIntoViewProps {
  focused?: boolean;
  ref: React.MutableRefObject<HTMLElement | null>;
}

export function useScrollIntoView({ focused = false, ref }: UseScrollIntoViewProps): void {
  const previous = useRef<{ focused?: boolean }>({});

  // make sure focused has previously been set so this doesn't scroll the whole page to this element on load
  useLayoutEffect((): void => {
    if (Object.prototype.hasOwnProperty.call(previous.current, 'focused')) {
      if (focused && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
    previous.current.focused = focused;
  }, [focused, ref]);
}
