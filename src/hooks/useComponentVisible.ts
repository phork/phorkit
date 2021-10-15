import { useCallback, useMemo, useState, useRef } from 'react';
import { useHandleClickOutside } from './useHandleClickOutside';
import { useHandleEscape } from './useHandleEscape';

export type UseComponentVisibleProps = {
  ignoreClickOutside?: boolean;
  ignoreEscape?: boolean;
  initialVisible?: boolean;
  onHide?: () => void;
  onShow?: () => void;
  permanent?: boolean;
  /** clickOutsideExclusions are areas that can be clicked without triggering close (required for portals) */
  clickOutsideExclusions?: HTMLElement[];
  /** Stop the event propagation if the escape key is pressed */
  stopPropagation?: boolean;
};

export type UseComponentVisibleResponse<C> = {
  ref: React.MutableRefObject<C>;
  isComponentVisible: boolean;
  setIsComponentVisible: (isComponentVisible: boolean) => void;
};

/**
 * Tracks whether a component is visible, and attaches
 * event handlers to hide the component on escape or when
 * a click happens outside the component.
 */
export function useComponentVisible<C extends HTMLElement>({
  ignoreClickOutside = false,
  ignoreEscape = false,
  initialVisible = false,
  onHide,
  onShow,
  permanent = false,
  clickOutsideExclusions,
  stopPropagation = false,
}: UseComponentVisibleProps): UseComponentVisibleResponse<C> {
  const [isComponentVisible, setIsComponentVisible] = useState<boolean>(initialVisible || permanent ? true : false);
  const ref = useRef<C>(null!);

  useHandleClickOutside<C>({
    clickOutsideExclusions,
    onHide: useCallback(() => {
      if (isComponentVisible && !permanent && !ignoreClickOutside) {
        onHide?.();
        setIsComponentVisible(false);
      }
    }, [ignoreClickOutside, isComponentVisible, onHide, permanent]),
    ref,
  });

  useHandleEscape<C>({
    onEscape: useCallback(() => {
      if (isComponentVisible && !permanent && !ignoreEscape) {
        onHide?.();
        setIsComponentVisible(false);
      }
    }, [ignoreEscape, isComponentVisible, onHide, permanent]),
    stopPropagation,
  });

  const setIsComponentVisibleWithCallbacks = useCallback(
    (visible: boolean): void => {
      if (visible && !isComponentVisible) {
        onShow?.();
        return setIsComponentVisible(true);
      }
      if (!visible && isComponentVisible) {
        onHide?.();
        return setIsComponentVisible(false);
      }
      return;
    },
    [isComponentVisible, onHide, onShow],
  );

  return useMemo(
    () => ({
      ref,
      isComponentVisible,
      setIsComponentVisible: onHide || onShow ? setIsComponentVisibleWithCallbacks : setIsComponentVisible,
    }),
    [onHide, onShow, isComponentVisible, setIsComponentVisibleWithCallbacks],
  );
}
