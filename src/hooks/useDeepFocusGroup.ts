import produce from 'immer';
import { useCallback, useRef, useState } from 'react';
import { useSafeTimeout } from './useSafeTimeout';

export type UseDeepFocusGroupRef<E extends Element = HTMLElement> = React.RefObject<E | null | undefined>;
export type UseDeepFocusGroupRefWithHandle<
  E extends Element = HTMLElement,
  H extends string = string,
> = React.RefObject<Record<H, E>>;

export type UseDeepFocusGroupEventHandlers = {
  /** A memoized function to call for each ref when it loses focus */
  onBlur?: (id: string) => void;
  /** A memoized function to call when all refs have lost focus */
  onBlurAll?: (event?: React.FocusEvent<HTMLElement>) => void;
  /** A memoized function to call for each ref when it gains focus */
  onFocus?: (id: string) => void;
};

export type UseDeepFocusGroupOptions = {
  /** This allows access to the event object’s properties after the event handler has run */
  persistEvents?: boolean;
  /** This will delay the blur so that another focus can cancel it */
  blurDelay?: number;
};

export type UseDeepFocusGroupResponse = {
  addRef: <E extends HTMLElement, H extends string | undefined = undefined>(props: {
    id: string;
    ref: H extends string ? UseDeepFocusGroupRefWithHandle<E, H> : UseDeepFocusGroupRef<E>;
    /** If passive is true then the ref is added but no focus or blur events are triggered at the time of addition */
    passive?: boolean;
    /** To be used with the imperative handle hook */
    handle?: string;
  }) => void;
  clearRefs: () => void;
  /** handleBlur should be set as the onBlur handler for every element that's tracked */
  handleBlur: React.FocusEventHandler<HTMLElement>;
  /** handleFocus should be set as the onFocus handler for every element that's tracked */
  handleFocus: React.FocusEventHandler<HTMLElement>;
  isIdFocused: (id: string) => boolean;
  removeRef: (props: { id: string; passive?: boolean }) => void;
};

// to be used as a type-guard
const isRefWithImperativeHandle = (
  ref: UseDeepFocusGroupRef | UseDeepFocusGroupRefWithHandle,
): ref is UseDeepFocusGroupRefWithHandle => {
  return (ref as UseDeepFocusGroupRefWithHandle) !== undefined;
};

// to be used as a type-guard
const isRefObject = (ref: UseDeepFocusGroupRef | UseDeepFocusGroupRefWithHandle): ref is UseDeepFocusGroupRef => {
  return (ref as UseDeepFocusGroupRef).current !== undefined;
};

/**
 * Stores a collection of refs (elements) by ID and
 * returns a function that can be used to check if a
 * specific element or its children have focus. It
 * also accepts `onBlur` and `onFocus` callbacks which
 * are called for each element whose focus state changes,
 * and `onBlurAll` for when all registered elements
 * have lost focus.
 *
 * This returns `addRef`, `removeRef` and `clearRefs`
 * functions that are used to register and unregister
 * the elements to track, and `handleBlur` and `handleFocus`
 * callbacks that should be attached to each element
 * that should be tracked.
 *
 * @example
 * const FOCUS_REFS = {
 *   INPUT: 'input',
 *   BUTTON: 'button',
 * };
 *
 * const onFocus = useCallback(() => console.log('focus'), []);
 * const onBlur = useCallback(() => console.log('blur'), []);
 *
 * const {
 *   addRef,
 *   clearRefs,
 *   handleFocus,
 *   handleBlur,
 *   isIdFocused
 * } = useDeepFocusGroup({ onBlur, onFocus }, { blurDelay: 150 });
 *
 * const inputRef = useRef<HTMLInputElement>(null!);
 * const buttonRef = useRef<HTMLButtonElement>(null!);
 *
 * useEffect(() => {
 *   clearRefs();
 *
 *   addRef<HTMLInputElement>({ id: FOCUS_REFS.INPUT, ref: inputRef, passive: true });
 *   addRef<HTMLButtonElement>({ id: FOCUS_REFS.BUTTON, ref: buttonRef, passive: true });
 *  }, [addRef, clearRefs]);
 *
 * const isInputFocused = isIdFocused(FOCUS_REFS.INPUT);
 * const isButtonFocused = isIdFocused(FOCUS_REFS.BUTTON);
 *
 * return (
 *   <div>
 *     <input onBlur={handleBlur} onFocus={handleFocus} type="text" />
 *     <button onBlur={handleBlur} onFocus={handleFocus}>Submit</button>
 *   </div>
 * )
 */
export function useDeepFocusGroup(
  { onBlur, onBlurAll, onFocus }: UseDeepFocusGroupEventHandlers = {},
  { persistEvents = false, blurDelay = 0 }: UseDeepFocusGroupOptions = {},
): UseDeepFocusGroupResponse {
  const previousResponse = useRef<UseDeepFocusGroupResponse>({} as UseDeepFocusGroupResponse);
  const previousFocusedIds = useRef<string[] | undefined>();
  const [focusedIds, setFocusedIds] = useState<string[] | undefined>();
  const { setSafeTimeout, clearSafeTimeout } = useSafeTimeout();
  const clearBlurTimeoutId = useRef<string>();
  const refs = useRef<Record<string, UseDeepFocusGroupRef>>({});
  const refsWithHandles = useRef<Record<string, { handle: string; ref: UseDeepFocusGroupRefWithHandle }>>({});

  const isIdFocused = useCallback<UseDeepFocusGroupResponse['isIdFocused']>(
    id => focusedIds?.includes(id) || false,
    [focusedIds],
  );

  const getFocusedIds = useCallback((): string[] | undefined => {
    const focusedIds = [
      ...Object.keys(refs.current).filter(id => {
        const ref = refs.current[id].current;
        return ref && (document.activeElement === ref || ref.contains(document.activeElement));
      }),
      ...Object.keys(refsWithHandles.current).filter(id => {
        const ref = refsWithHandles.current[id].ref.current;
        const handle = refsWithHandles.current[id].handle;
        return document.activeElement === ref?.[handle] || ref?.[handle]?.contains(document.activeElement);
      }),
    ];
    return focusedIds.length ? focusedIds : undefined;
  }, []);

  // if the focus ID changes this fires the blur callback(s) and then the focus callback(s) if appropriate
  const updateFocusedIds = useCallback(
    (ids: string[] | undefined, event?: React.FocusEvent<HTMLElement>): void => {
      const removedIds = previousFocusedIds.current?.filter(id => !ids?.includes(id));
      onBlur && removedIds?.forEach(id => onBlur(id));

      const addedIds = ids?.filter(id => !previousFocusedIds.current?.includes(id));
      onFocus && addedIds?.forEach(id => onFocus(id));

      // only update the state if IDs have actually changed
      if (removedIds?.length || addedIds?.length) {
        setFocusedIds(ids);
        previousFocusedIds.current = ids;

        if (!ids) {
          onBlurAll?.(event);
        }
      }
    },
    [onBlur, onBlurAll, onFocus],
  );

  const addRef = useCallback<UseDeepFocusGroupResponse['addRef']>(
    ({ id, ref, passive, handle }) => {
      if (refs.current[id] || refsWithHandles.current[id]) throw new Error(`ID ${id} already exists.`);

      if (isRefWithImperativeHandle(ref) && handle) {
        refsWithHandles.current[id] = { handle, ref };
      } else if (isRefObject(ref)) {
        refs.current[id] = ref;
      } else {
        throw new Error(`Invalid ref for ID ${id}.`);
      }
      !passive && typeof document !== 'undefined' && updateFocusedIds(getFocusedIds());
    },
    [getFocusedIds, updateFocusedIds],
  );

  const removeRef = useCallback<UseDeepFocusGroupResponse['removeRef']>(
    ({ id, passive }) => {
      if (!refs.current[id] && !refsWithHandles.current[id]) throw new Error(`ID ${id} does not exist.`);
      delete refs.current[id];
      delete refsWithHandles.current[id];
      !passive && typeof document !== 'undefined' && updateFocusedIds(getFocusedIds());
    },
    [getFocusedIds, updateFocusedIds],
  );

  const clearRefs = useCallback(() => {
    refs.current = {};
    refsWithHandles.current = {};
  }, []);

  const handleFocus = useCallback<UseDeepFocusGroupResponse['handleFocus']>(
    event => {
      clearBlurTimeoutId.current && clearSafeTimeout(clearBlurTimeoutId.current);
      persistEvents && event.persist();
      updateFocusedIds(getFocusedIds(), event);
    },
    [clearSafeTimeout, getFocusedIds, persistEvents, updateFocusedIds],
  );

  const handleBlur = useCallback<UseDeepFocusGroupResponse['handleBlur']>(
    event => {
      persistEvents && event.persist();

      const blurCallback = (event: React.FocusEvent<HTMLElement>) => {
        updateFocusedIds(getFocusedIds(), event);
      };

      if (blurDelay) {
        clearBlurTimeoutId.current = setSafeTimeout(() => blurCallback(event), blurDelay);
      } else {
        blurCallback(event);
      }
    },
    [blurDelay, getFocusedIds, persistEvents, setSafeTimeout, updateFocusedIds],
  );

  previousResponse.current = produce(previousResponse.current, draftState => {
    draftState.addRef = addRef;
    draftState.clearRefs = clearRefs;
    draftState.handleBlur = handleBlur;
    draftState.handleFocus = handleFocus;
    draftState.isIdFocused = isIdFocused;
    draftState.removeRef = removeRef;
  });
  return previousResponse.current;
}
