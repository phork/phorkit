import { useCallback } from 'react';
import { useElementEventListener } from './useElementEventListener';

export interface UseHandleEscapeInterface<C extends HTMLElement> {
  onEscape: (event: KeyboardEvent) => void;
  ref?: React.RefObject<C>;
  stopPropagation?: boolean;
}

/**
 * Accepts a function to be called when the Escape key
 * is used. If a ref element is passed the function
 * is only called if the event happened within that
 * element.
 */
export function useHandleEscape<C extends HTMLElement>({
  onEscape,
  ref,
  stopPropagation = false,
}: UseHandleEscapeInterface<C>): void {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        if (!ref || ref.current?.contains(event.target as HTMLElement)) {
          stopPropagation && event.stopPropagation();
          onEscape?.(event);
        }
      }
    },
    [onEscape, ref, stopPropagation],
  );

  useElementEventListener({ eventType: 'keydown', callback: handleKeyDown as EventListener, options: true });
}
