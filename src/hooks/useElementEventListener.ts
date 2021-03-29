import { useEffect } from 'react';

export interface UseElementEventListenerInterface {
  element?: HTMLElement;
  eventType: keyof HTMLElementEventMap;
  callback: EventListener;
  options?: boolean | AddEventListenerOptions;
}

export const useElementEventListener = ({
  element: initElement,
  eventType,
  callback,
  options,
}: UseElementEventListenerInterface) => {
  useEffect((): (() => void) | undefined => {
    const element = initElement || document;
    if (!element || !element.addEventListener) return undefined;

    // necessary because the callback may have changed by the time it needs to be removed
    const listener = (event: Event) => callback(event);

    element.addEventListener(eventType, listener, options);
    return () => element.removeEventListener(eventType, listener, options);
  }, [callback, eventType, initElement, options]);
};
