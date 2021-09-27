import { useEffect } from 'react';

interface UseRefEventListenerProps {
  ref?: React.RefObject<HTMLElement>;
  eventType: keyof HTMLElementEventMap;
  callback: EventListener;
  options?: boolean | AddEventListenerOptions;
}

/**
 * Adds an event listener to the element set in the ref,
 * and removes the listener in a clean up function.
 */
export const useRefEventListener = ({ ref, eventType, callback, options }: UseRefEventListenerProps): void => {
  useEffect((): (() => void) | undefined => {
    if (!ref?.current || !ref.current.addEventListener) return undefined;

    // necessary because these may have changed by the time it should be removed
    const element = ref.current;
    const listener = (event: Event) => callback(event);

    element.addEventListener(eventType, listener, options);
    return () => element.removeEventListener(eventType, listener, options);
  }, [callback, eventType, options, ref]);
};
