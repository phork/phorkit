import { useCallback } from 'react';
import { useElementEventListener } from './useElementEventListener';

export type useHandleClickOutside<C extends HTMLElement> = {
  /** clickOutsideExclusions are areas that can be clicked without triggering close (required for portals) */
  clickOutsideExclusions?: HTMLElement[];
  onHide?: (event: MouseEvent | TouchEvent) => void;
  ref: React.RefObject<C>;
  stopPropagation?: boolean;
};

/**
 * Accepts a ref element and a function to be called
 * if a mouse or touch event happens outside that
 * element.
 */
export function useHandleClickOutside<C extends HTMLElement>({
  clickOutsideExclusions,
  onHide,
  ref,
  stopPropagation = false,
}: useHandleClickOutside<C>): void {
  const handleClickOutside = useCallback(
    (event: MouseEvent | TouchEvent): void => {
      const isExcluded =
        clickOutsideExclusions &&
        clickOutsideExclusions.some(node => node && node.contains(event.target as HTMLElement));

      if (!isExcluded && ref.current && !ref.current.contains(event.target as HTMLElement)) {
        stopPropagation && event.stopPropagation();
        onHide?.(event);
      }
    },
    [clickOutsideExclusions, ref, stopPropagation, onHide],
  );

  useElementEventListener({ eventType: 'click', callback: handleClickOutside as EventListener, capture: true });
  useElementEventListener({ eventType: 'touchend', callback: handleClickOutside as EventListener, capture: true });
}
