import { produce } from 'immer';
import { useCallback, useRef, useState } from 'react';
import { useSafeTimeout } from './useSafeTimeout';

export type UseDeepFocusEventHandlers<E> = {
  onBlur?: React.FocusEventHandler<E>;
  onBlurChild?: React.FocusEventHandler;
  onBlurSelf?: React.FocusEventHandler<E>;
  onFocus?: React.FocusEventHandler<E>;
  onFocusChild?: React.FocusEventHandler;
  onFocusSelf?: React.FocusEventHandler<E>;
};

export type UseDeepFocusOptions = {
  alwaysTriggerBlur?: boolean;
  alwaysTriggerFocus?: boolean;
  /** This allows access to the event object’s properties after the event handler has run */
  persistEvents?: boolean;
  /** This will delay the blur so that another focus can cancel it */
  blurDelay?: number;
};

export type UseDeepFocusResponse<E> = {
  focused: boolean;
  handleBlur: React.FocusEventHandler<E>;
  handleFocus: React.FocusEventHandler<E>;
  /** This should only be used if the state is in fact focused but a child stopped the focus propagation before it could be set */
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Calls `onBlur` when neither the element nor its children
 * have focus, and `onFocus` when the element or one of its
 * children have focus.
 *
 * The blur handler can be called set to have a delay so
 * a focus can cancel it.
 *
 * If `alwaysTriggerFocus` or `alwaysTriggerBlur` are true
 * then the respective handler functions are called even
 * if the focus changes from one [focused|blurred] child
 * to another. If they are false then the handlers are
 * only called on each initial focus and blur.
 *
 * Additional handlers are available when the ref element
 * itself gets focus or blurs, and when different children
 * focus or blur.
 *
 * This can be used along with the `DeepFocus` context.
 */
export function useDeepFocus<E extends HTMLElement>(
  ref: React.RefObject<E | null> | null,
  { onBlur, onBlurChild, onBlurSelf, onFocus, onFocusChild, onFocusSelf }: UseDeepFocusEventHandlers<E> = {},
  {
    persistEvents = false,
    blurDelay = 0,
    alwaysTriggerBlur = false,
    alwaysTriggerFocus = false,
  }: UseDeepFocusOptions = {},
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
          onFocusSelf?.(event);
        } else {
          onFocusChild?.(event);
        }
      }

      // don't trigger when swapping between children unless alwaysTriggerFocus is set
      if (alwaysTriggerFocus || !event.currentTarget?.contains(event.relatedTarget as Node)) {
        onFocus?.(event);
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
            onBlurSelf?.(event);
          } else {
            onBlurChild?.(event);
          }
        }

        // don't trigger when swapping between children unless alwaysTriggerBlur is set
        if (alwaysTriggerBlur || !event.currentTarget?.contains(event.relatedTarget as Node)) {
          onBlur?.(event);
        }

        previousFocused.current = false;
      };

      if (!isSelfFocused() && !ref?.current?.contains(event.relatedTarget as Node)) {
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
    draftState.setFocused = setFocused;
  });
  return previousResponse.current;
}
