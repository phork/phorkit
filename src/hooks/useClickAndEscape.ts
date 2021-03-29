import { useCallback } from 'react';
import { useElementEventListener } from './useElementEventListener';

export interface UseClickAndEscapeInterface {
  ref: React.RefObject<HTMLElement>;
  onBlur?: <T = MouseEvent | KeyboardEvent | TouchEvent>(event: T) => void;
  onFocus?: <T = MouseEvent | KeyboardEvent | TouchEvent>(event: T) => void;
  stopPropagation?: boolean;
}

// used to handle focus and blur callbacks on elements where any child can focus
export function useClickAndEscape({ ref, onBlur, onFocus, stopPropagation }: UseClickAndEscapeInterface): void {
  const handleClick = useCallback(
    (event: MouseEvent | TouchEvent): void => {
      if (ref.current && event.target instanceof Node) {
        if (ref.current.contains(event.target)) {
          if (ref.current?.querySelectorAll(':focus').length !== 1) {
            onFocus && onFocus(event);
          }
        } else {
          onBlur && onBlur(event);
        }
      }
    },
    [onBlur, onFocus, ref],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        stopPropagation && event.stopPropagation();
        onBlur && onBlur(event);
      }
    },
    [onBlur, stopPropagation],
  );

  useElementEventListener({ eventType: 'click', callback: handleClick as EventListener, options: true });
  useElementEventListener({ eventType: 'keydown', callback: handleKeyDown as EventListener, options: true });
}
