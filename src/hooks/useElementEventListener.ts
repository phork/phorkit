import { useEffect } from 'react';

type UseElementEventListenerWithOptions = {
  capture?: never;
  options?: AddEventListenerOptions;
};

type UseElementEventListenerWithCapture = {
  capture?: boolean;
  options?: never;
};

export type UseElementEventListenerProps = {
  callback: EventListener;
  element?: HTMLElement;
  eventType: keyof HTMLElementEventMap;
} & (UseElementEventListenerWithOptions | UseElementEventListenerWithCapture);

/**
 * Adds an event listener to the element passed (or the
 * document if no element is passed) and removes the listener
 * in a clean up function.
 */
export const useElementEventListener = ({
  callback,
  capture,
  element: initElement,
  eventType,
  options,
}: UseElementEventListenerProps) => {
  useEffect((): (() => void) | undefined => {
    const element = initElement || (typeof document !== undefined && document) || undefined;
    if (!element || !element.addEventListener) return undefined;

    element.addEventListener(eventType, callback, options || capture);
    return () => element.removeEventListener(eventType, callback, options || capture);
  }, [callback, capture, eventType, initElement, options]);
};
