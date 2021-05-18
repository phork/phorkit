import produce from 'immer';
import { useCallback, useRef } from 'react';
import { useSafeTimeout } from './useSafeTimeout';

export type UseTriggerFocusRef<E extends Element = HTMLElement> = React.RefObject<E | null | undefined>;
export type UseTriggerFocusRefWithHandle<E extends Element = HTMLElement, H extends string = string> = React.RefObject<
  Record<H, E>
>;

export type UseTriggerFocusOptions = {
  /** This will delay the focus so that another focus can cancel it */
  focusDelay?: number;
};

export type UseTriggerFocusResponse = {
  focus: <E extends HTMLElement, H extends string | undefined = undefined>(
    ref: H extends string ? UseTriggerFocusRefWithHandle<E, H> : UseTriggerFocusRef<E>,
    handle?: string,
  ) => void;
  cancel: () => void;
};

// to be used as a type-guard
const isRefWithImperativeHandle = (
  ref: UseTriggerFocusRef | UseTriggerFocusRefWithHandle,
): ref is UseTriggerFocusRefWithHandle => {
  return (ref as UseTriggerFocusRefWithHandle) !== undefined;
};

// to be used as a type-guard
const isRefObject = (ref: UseTriggerFocusRef | UseTriggerFocusRefWithHandle): ref is UseTriggerFocusRef => {
  return (ref as UseTriggerFocusRef).current !== undefined;
};

// useTriggerFocus can focus a ref with an optional delay
export function useTriggerFocus({ focusDelay }: UseTriggerFocusOptions = {}): UseTriggerFocusResponse {
  const previousResponse = useRef<UseTriggerFocusResponse>({} as UseTriggerFocusResponse);
  const { setSafeTimeout, clearSafeTimeout } = useSafeTimeout();
  const clearBlurTimeoutId = useRef<string>();

  const focus = useCallback<UseTriggerFocusResponse['focus']>(
    (ref, handle) => {
      clearBlurTimeoutId.current && clearSafeTimeout(clearBlurTimeoutId.current);

      const focusCallback: UseTriggerFocusResponse['focus'] = (ref, handle) => {
        if (isRefWithImperativeHandle(ref) && handle) {
          ref.current?.[handle]?.focus();
        } else if (isRefObject(ref)) {
          ref.current?.focus();
        } else {
          throw new Error('Invalid ref');
        }
      };

      if (focusDelay) {
        clearBlurTimeoutId.current = setSafeTimeout(() => focusCallback(ref, handle), focusDelay);
      } else {
        focusCallback(ref, handle);
      }
    },
    [clearSafeTimeout, focusDelay, setSafeTimeout],
  );

  const cancel = useCallback(() => {
    clearBlurTimeoutId.current && clearSafeTimeout(clearBlurTimeoutId.current);
  }, [clearSafeTimeout]);

  previousResponse.current = produce(previousResponse.current, draftState => {
    draftState.focus = focus;
    draftState.cancel = cancel;
  });
  return previousResponse.current;
}
