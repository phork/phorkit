import { useCallback, useMemo, useState, useRef } from 'react';
import { useElementEventListener } from './useElementEventListener';

export interface UseComponentVisibleInterface {
  ignoreClickOutside?: boolean;
  initialVisible?: boolean;
  onHide?: () => void;
  onShow?: () => void;
  permanent?: boolean;
  clickOutsideExclusions?: HTMLElement[];
  stopPropagation?: boolean;
}

export type UseComponentVisibleResponse<C> = {
  ref: React.MutableRefObject<C>;
  isComponentVisible: boolean;
  setIsComponentVisible: (isComponentVisible: boolean) => void;
};

// clickOutsideExclusions are areas that can be clicked without triggering close (required for portals)
export function useComponentVisible<C extends HTMLElement>({
  ignoreClickOutside = false,
  initialVisible = false,
  onHide,
  onShow,
  permanent = false,
  clickOutsideExclusions,
  stopPropagation = false,
}: UseComponentVisibleInterface): UseComponentVisibleResponse<C> {
  const [isComponentVisible, setIsComponentVisible] = useState<boolean>(initialVisible || permanent ? true : false);
  const ref = useRef<C>(null!);

  const handleHideComponent = useCallback(
    (event: KeyboardEvent): void => {
      if (isComponentVisible && !permanent && event.key === 'Escape') {
        stopPropagation && event.stopPropagation();
        onHide && onHide();
        setIsComponentVisible(false);
      }
    },
    [isComponentVisible, onHide, permanent, stopPropagation],
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent | TouchEvent): void => {
      const isExcluded =
        ignoreClickOutside ||
        (clickOutsideExclusions &&
          clickOutsideExclusions.some(node => node && event.target instanceof Node && node.contains(event.target)));

      if (
        !permanent &&
        ref.current &&
        event.target instanceof Node &&
        !ref.current.contains(event.target) &&
        !isExcluded
      ) {
        onHide && onHide();
        setIsComponentVisible(false);
      }
    },
    [ignoreClickOutside, clickOutsideExclusions, permanent, onHide],
  );

  useElementEventListener({ eventType: 'click', callback: handleClickOutside as EventListener, options: true });
  useElementEventListener({ eventType: 'keydown', callback: handleHideComponent as EventListener, options: true });

  const setIsComponentVisibleWithCallbacks = useCallback(
    (visible: boolean): void => {
      if (visible && !isComponentVisible) {
        onShow && onShow();
        return setIsComponentVisible(true);
      }
      if (!visible && isComponentVisible) {
        onHide && onHide();
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
