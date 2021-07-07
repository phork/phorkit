import { useEffect, useRef } from 'react';
import { useScrollIntoView } from '../../hooks/useScrollIntoView';

interface UseInteractiveGroupItemInterface<E extends HTMLElement> {
  focused?: boolean;
  ref: React.MutableRefObject<E | null>;
}

export function useInteractiveGroupItem<E extends HTMLElement>({
  focused = false,
  ref,
}: UseInteractiveGroupItemInterface<E>) {
  const previous = useRef<{ focused?: UseInteractiveGroupItemInterface<E>['focused'] }>({});
  useScrollIntoView({ ref, focused });

  /**
   * Steal focus away from whatever child element may have it and put it at the
   * top level, but don't steal focus away if the focus is on a parent element.
   * This must check that previous.current.focused has been set so it doesn't run
   * on initialization.
   */
  useEffect(() => {
    if (focused !== previous.current.focused && Object.prototype.hasOwnProperty.call(previous.current, 'focused')) {
      if (focused && ref.current && ref.current.querySelectorAll(':focus').length === 1) {
        ref.current.focus();
      }
    }
    previous.current.focused = focused;
  }, [focused, ref]);
}
