import { useCallback } from 'react';
import { getFirstFocusableElement, getLastFocusableElement } from '../utils/getFocusableElements';
import { useElementEventListener } from './useElementEventListener';

export type UseFocusTrapProps<T> = {
  container: React.RefObject<T>;
};

/**
 * Traps the focus so it doesn't leave the container
 * that was passed as a ref. It should cycle through
 * all the focusable elements in the container.
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>({ container }: UseFocusTrapProps<T>) {
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

  useElementEventListener({ eventType: 'keydown', callback: handleKeyDown as EventListener, capture: true });
}
