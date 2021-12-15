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
  disabled?: boolean;
} & (UseElementEventListenerWithOptions | UseElementEventListenerWithCapture);

/**
 * Adds an event listener to the element passed (or the
 * document if no element is passed) and removes the
 * listener in a clean up function.
 */
export const useElementEventListener = ({
  callback,
  capture,
  disabled,
  element: initElement,
  eventType,
  options,
}: UseElementEventListenerProps): void => {
  useEffect((): (() => void) | void => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const element = initElement || (typeof document !== undefined ? document : undefined);
    if (!element) return undefined;

    if (!disabled) {
      element.addEventListener(eventType, callback, options || capture);
      return () => element.removeEventListener(eventType, callback, options || capture);
    }
  }, [callback, capture, disabled, eventType, initElement, options]);
};
