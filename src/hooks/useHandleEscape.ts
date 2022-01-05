import { useCallback } from 'react';
import { useElementEventListener } from './useElementEventListener';

export type UseHandleEscapeProps<C extends HTMLElement = HTMLElement> = {
  /** If this returns true the callback will be executed; false will cancel it */
  confirm?: () => Promise<boolean>;
  onEscape?: (event: KeyboardEvent) => void;
  ref?: React.RefObject<C>;
  stopPropagation?: boolean;
};

/**
 * Accepts a function to be called when the Escape key
 * is used. If a ref element is passed then the function
 * is only called if the event happened within that
 * element.
 */
export function useHandleEscape<C extends HTMLElement = HTMLElement>({
  confirm,
  onEscape,
  ref,
  stopPropagation = false,
}: UseHandleEscapeProps<C>): void {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        if (!ref || ref.current?.contains(event.target as HTMLElement)) {
          if (confirm) {
            confirm().then((response: boolean) => {
              if (response) {
                stopPropagation && event.stopPropagation();
                onEscape?.(event);
              }
            });
          } else {
            stopPropagation && event.stopPropagation();
            onEscape?.(event);
          }
        }
      }
    },
    [confirm, onEscape, ref, stopPropagation],
  );

  useElementEventListener({
    eventType: 'keydown',
    callback: handleKeyDown as EventListener,
    capture: true,
    disabled: !onEscape,
  });
}
