import produce from 'immer';
import { useCallback, useRef } from 'react';
import { useSafeTimeout } from './useSafeTimeout';

export type UseTriggerFocusRef<E extends Element = HTMLElement> = React.RefObject<E | null | undefined>;
export type UseTriggerFocusRefWithHandle<E extends Element = HTMLElement, H extends string = string> = React.RefObject<
  Record<H, E>
>;

export type UseTriggerFocusOptions = {
  /** The default focus delay will delay the focus so that another focus can cancel it */
  focusDelay?: number;
};

export type UseTriggerFocusResponse = {
  focus: <E extends HTMLElement, H extends string | undefined = undefined>(props: {
    ref: H extends string ? UseTriggerFocusRefWithHandle<E, H> : UseTriggerFocusRef<E>;
    handle?: H;
    /** The default focus delay can be be overridden or cancelled with 0 */
    delay?: number;
  }) => void;
  cancel: () => void;
};

// to be used as a type guard
const isRefWithImperativeHandle = (
  ref: UseTriggerFocusRef | UseTriggerFocusRefWithHandle,
): ref is UseTriggerFocusRefWithHandle => {
  return (ref as UseTriggerFocusRefWithHandle) !== undefined;
};

// to be used as a type guard
const isRefObject = (ref: UseTriggerFocusRef | UseTriggerFocusRefWithHandle): ref is UseTriggerFocusRef => {
  return (ref as UseTriggerFocusRef).current !== undefined;
};

/**
 * Returns a `focus` function that can be used to focus
 * an element after an optional delay, as well as a `cancel`
 * function that can be used to cancel the focus if a focus
 * delay has been used and cancel is called within that
 * delay time.
 */
export function useTriggerFocus({
  focusDelay: defaultFocusDelay,
}: UseTriggerFocusOptions = {}): UseTriggerFocusResponse {
  const previousResponse = useRef<UseTriggerFocusResponse>({} as UseTriggerFocusResponse);
  const { setSafeTimeout, clearSafeTimeout } = useSafeTimeout();
  const clearBlurTimeoutId = useRef<string>();

  const focus = useCallback<UseTriggerFocusResponse['focus']>(
    ({ ref, handle, delay }) => {
      const focusDelay = delay ?? defaultFocusDelay;
      clearBlurTimeoutId.current && clearSafeTimeout(clearBlurTimeoutId.current);

      const focusCallback: UseTriggerFocusResponse['focus'] = ({ ref, handle }) => {
        if (isRefWithImperativeHandle(ref) && typeof handle === 'string') {
          ref.current?.[handle]?.focus();
        } else if (isRefObject(ref)) {
          ref.current?.focus();
        } else {
          throw new Error('Invalid ref');
        }
      };

      if (focusDelay) {
        clearBlurTimeoutId.current = setSafeTimeout(() => focusCallback({ ref, handle }), focusDelay);
      } else {
        focusCallback({ ref, handle });
      }
    },
    [clearSafeTimeout, defaultFocusDelay, setSafeTimeout],
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
