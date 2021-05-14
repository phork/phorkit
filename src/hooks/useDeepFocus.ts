import produce from 'immer';
import { useCallback, useRef, useState } from 'react';
import { useSafeTimeout } from './useSafeTimeout';

export interface UseDeepFocusEventHandlers<E> {
  onBlur?: React.FocusEventHandler<E>;
  onBlurChild?: React.FocusEventHandler;
  onBlurSelf?: React.FocusEventHandler<E>;
  onFocus?: React.FocusEventHandler<E>;
  onFocusChild?: React.FocusEventHandler;
  onFocusSelf?: React.FocusEventHandler<E>;
}

export type UseDeepFocusOptions = {
  alwaysTriggerBlur?: boolean;
  alwaysTriggerFocus?: boolean;
  /** This allow access to the event object’s properties after the event handler has run */
  persistEvents?: boolean;
  /** This will delay the blur so that another focus can cancel it */
  blurDelay?: number;
};

export type UseDeepFocusResponse<E> = {
  focused: boolean;
  handleBlur: React.FocusEventHandler<E>;
  handleFocus: React.FocusEventHandler<E>;
};

/** useDeepFocus calls onBlur when neither the element nor its children have focus */
export function useDeepFocus<E extends HTMLElement>(
  ref: React.RefObject<E | null> | null,
  { onBlur, onBlurChild, onBlurSelf, onFocus, onFocusChild, onFocusSelf }: UseDeepFocusEventHandlers<E> = {},
  { persistEvents, blurDelay, alwaysTriggerBlur, alwaysTriggerFocus }: UseDeepFocusOptions = {},
): UseDeepFocusResponse<E> {
  const previousResponse = useRef<UseDeepFocusResponse<E>>({} as UseDeepFocusResponse<E>);
  const previousFocused = useRef<boolean>();
  const [focused, setFocused] = useState<boolean>(false);
  const { setSafeTimeout, clearSafeTimeout } = useSafeTimeout();
  const clearBlurTimeoutId = useRef<string>();

  const isSelfFocused = useCallback(
    () => typeof document !== 'undefined' && document.activeElement && document.activeElement === ref?.current,
    [ref],
  );

  const handleFocus = useCallback<React.FocusEventHandler<E>>(
    event => {
      clearBlurTimeoutId.current && clearSafeTimeout(clearBlurTimeoutId.current);

      persistEvents && event.persist();
      setFocused(true);

      if (!previousFocused.current) {
        if (event.currentTarget === event.target) {
          onFocusSelf && onFocusSelf(event);
        } else {
          onFocusChild && onFocusChild(event);
        }
      }

      // don't trigger when swapping between children unless alwaysTriggerFocus is set
      if (alwaysTriggerFocus || !event.currentTarget?.contains(event.relatedTarget as Node)) {
        onFocus && onFocus(event);
      }

      previousFocused.current = true;
    },
    [alwaysTriggerFocus, clearSafeTimeout, onFocus, onFocusChild, onFocusSelf, persistEvents],
  );

  // remove focus if neither the element or its children have focus
  const handleBlur = useCallback<React.FocusEventHandler<E>>(
    event => {
      persistEvents && event.persist();

      const blurCallback = (event: React.FocusEvent<E>) => {
        setFocused(false);

        if (previousFocused.current !== false) {
          if (event.currentTarget === event.target) {
            onBlurSelf && onBlurSelf(event);
          } else {
            onBlurChild && onBlurChild(event);
          }
        }

        // don't trigger when swapping between children unless alwaysTriggerBlur is set
        if (alwaysTriggerBlur || !event.currentTarget?.contains(event.relatedTarget as Node)) {
          onBlur && onBlur(event);
        }

        previousFocused.current = false;
      };

      if (!(ref && isSelfFocused() && ref.current?.querySelectorAll(':focus').length === 1)) {
        if (blurDelay) {
          clearBlurTimeoutId.current = setSafeTimeout(() => blurCallback(event), blurDelay);
        } else {
          blurCallback(event);
        }
      }
    },
    [persistEvents, ref, isSelfFocused, alwaysTriggerBlur, onBlurSelf, onBlurChild, onBlur, blurDelay, setSafeTimeout],
  );

  previousResponse.current = produce(previousResponse.current, draftState => {
    draftState.focused = focused;
    draftState.handleBlur = handleBlur;
    draftState.handleFocus = handleFocus;
  });
  return previousResponse.current;
}
