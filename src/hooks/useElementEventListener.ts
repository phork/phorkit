import { useEffect } from 'react';

type UseElementEventListenerWithOptions = {
  options?: AddEventListenerOptions;
  capture?: never;
};

type UseElementEventListenerWithCapture = {
  options?: never;
  capture?: boolean;
};

export type UseElementEventListenerProps = {
  element?: HTMLElement;
  eventType: keyof HTMLElementEventMap;
  callback: EventListener;
} & (UseElementEventListenerWithOptions | UseElementEventListenerWithCapture);

/**
 * Adds an event listener to the element passed (or the
 * document if no element is passed) and removes the listener
 * in a clean up function.
 */
export const useElementEventListener = ({
  element: initElement,
  eventType,
  callback,
  capture,
  options,
}: UseElementEventListenerProps) => {
  useEffect((): (() => void) | undefined => {
    const element = initElement || (typeof document !== undefined && document) || undefined;
    if (!element || !element.addEventListener) return undefined;

    // necessary because the callback may have changed by the time it needs to be removed
    const listener = (event: Event) => callback(event);

    element.addEventListener(eventType, listener, options || capture);
    return () => element.removeEventListener(eventType, listener, options || capture);
  }, [callback, capture, eventType, initElement, options]);
};
