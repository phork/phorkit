import produce from 'immer';
import { useCallback, useRef } from 'react';
import {
  getFirstFocusableElement,
  getLastFocusableElement,
  getPreviousFocusableElement,
  getNextFocusableElement,
} from '../utils/getFocusableElements';
import { useElementEventListener } from './useElementEventListener';

export type UseFocusTrapResponse = {
  focusFirst: () => void;
  focusLast: () => void;
  focusNext: () => void;
  focusPrevious: () => void;
};

export type UseFocusTrapProps<T> = {
  container: React.RefObject<T>;
  /** A passive focus trap doesn't attach the event handler and relies on the caller to use the returned functions */
  passive?: boolean;
};

/**
 * Traps the focus so it doesn't leave the container
 * that was passed as a ref. It should cycle through
 * all the focusable elements in the container.
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>({
  container,
  passive,
}: UseFocusTrapProps<T>): UseFocusTrapResponse {
  const previousResponse = useRef<UseFocusTrapResponse>({} as UseFocusTrapResponse);

  const focusFirst = useCallback(() => {
    if (container.current) {
      const firstFocusableElement = getFirstFocusableElement(container.current);
      firstFocusableElement?.focus();
    }
  }, [container]);

  const focusLast = useCallback(() => {
    if (container.current) {
      const lastFocusableElement = getLastFocusableElement(container.current);
      lastFocusableElement?.focus();
    }
  }, [container]);

  const focusPrevious = useCallback(() => {
    if (container.current) {
      const previousFocusableElement = getPreviousFocusableElement(container.current);
      previousFocusableElement?.focus();
    }
  }, [container]);

  const focusNext = useCallback(() => {
    if (container.current) {
      const nextFocusableElement = getNextFocusableElement(container.current);
      nextFocusableElement?.focus();
    }
  }, [container]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (container.current) {
        const isTabPressed = event.key === 'Tab';

        if (isTabPressed) {
          const firstFocusableElement = getFirstFocusableElement(container.current);
          const lastFocusableElement = getLastFocusableElement(container.current);

          if (event.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement?.focus();
              event.preventDefault();
            }
          } else {
            // if tab key is pressed
            if (document.activeElement === lastFocusableElement) {
              firstFocusableElement?.focus();
              event.preventDefault();
            }
          }
        }
      }
    },
    [container],
  );

  useElementEventListener({
    eventType: 'keydown',
    callback: handleKeyDown as EventListener,
    capture: true,
    disabled: passive,
  });

  previousResponse.current = produce(previousResponse.current, draftState => {
    draftState.focusFirst = focusFirst;
    draftState.focusLast = focusLast;
    draftState.focusNext = focusNext;
    draftState.focusPrevious = focusPrevious;
  });
  return previousResponse.current;
}
