import { useEffect } from 'react';

type UseRefEventListenerWithOptions = {
  capture?: never;
  options?: AddEventListenerOptions;
};

type UseRefEventListenerWithCapture = {
  capture?: boolean;
  options?: never;
};

export type UseRefEventListenerProps = {
  callback: EventListener;
  eventType: keyof HTMLElementEventMap;
  ref?: React.RefObject<HTMLElement>;
} & (UseRefEventListenerWithOptions | UseRefEventListenerWithCapture);

/**
 * Adds an event listener to the element set in the ref,
 * and removes the listener in a clean up function.
 */
export const useRefEventListener = ({ callback, capture, eventType, options, ref }: UseRefEventListenerProps): void => {
  useEffect((): (() => void) | undefined => {
    if (!ref?.current || !ref.current.addEventListener) return undefined;

    // necessary because these may have changed by the time it should be removed
    const element = ref.current;
    const listener = (event: Event) => callback(event);

    element.addEventListener(eventType, listener, options || capture);
    return () => element.removeEventListener(eventType, listener, options || capture);
  }, [callback, capture, eventType, options, ref]);
};
