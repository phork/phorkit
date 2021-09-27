import produce from 'immer';
import { useCallback, useRef, useState } from 'react';
import { useSafeTimeout } from './useSafeTimeout';

export type UseDeepFocusGroupRef<E extends Element = HTMLElement> = React.RefObject<E | null | undefined>;
export type UseDeepFocusGroupRefWithHandle<
  E extends Element = HTMLElement,
  H extends string = string,
> = React.RefObject<Record<H, E>>;

export interface UseDeepFocusGroupEventHandlers {
  onBlur?: (id: string, event?: React.FocusEvent<HTMLElement>) => void;
  onFocus?: (id: string, event?: React.FocusEvent<HTMLElement>) => void;
}

export type UseDeepFocusGroupOptions = {
  /** This allow access to the event object’s properties after the event handler has run */
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
  handleBlur: React.FocusEventHandler<HTMLElement>;
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
 * useDeepFocusGroup calls onBlur when none of the refs
 * or their children have focus. Refs should not be
 * nested within each other with the exception of the
 * container ref, which can include all the other refs.
 */
export function useDeepFocusGroup(
  { onBlur, onFocus }: UseDeepFocusGroupEventHandlers = {},
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

  const getFocusedIds = useCallback((activeElement: Element | null): string[] | undefined => {
    const focusedIds = [
      ...Object.keys(refs.current).filter(id => {
        const ref = refs.current[id].current;
        return ref && (activeElement === ref || ref?.contains(activeElement));
      }),
      ...Object.keys(refsWithHandles.current).filter(id => {
        const ref = refsWithHandles.current[id].ref.current;
        const handle = refsWithHandles.current[id].handle;
        return activeElement === ref?.[handle] || ref?.[handle]?.contains(activeElement);
      }),
    ];
    return focusedIds.length ? focusedIds : undefined;
  }, []);

  // if the focus ID changes this fires the blur callback(s) and then the focus callback(s) if appropriate
  const updateFocusedIds = useCallback(
    (ids: string[] | undefined, event?: React.FocusEvent<HTMLElement>): void => {
      const removedIds = previousFocusedIds.current?.filter(id => !ids?.includes(id));
      onBlur && removedIds?.forEach(id => onBlur(id, event));

      const addedIds = ids?.filter(id => !previousFocusedIds.current?.includes(id));
      onFocus && addedIds?.forEach(id => onFocus(id, event));

      // only update the state if IDs have actually changed
      if (removedIds?.length || addedIds?.length) {
        setFocusedIds(ids);
        previousFocusedIds.current = ids;
      }
    },
    [onBlur, onFocus],
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
      !passive && typeof document !== 'undefined' && updateFocusedIds(getFocusedIds(document.activeElement));
    },
    [getFocusedIds, updateFocusedIds],
  );

  const removeRef = useCallback<UseDeepFocusGroupResponse['removeRef']>(
    ({ id, passive }) => {
      if (!refs.current[id] && !refsWithHandles.current[id]) throw new Error(`ID ${id} does not exist.`);
      delete refs.current[id];
      delete refsWithHandles.current[id];
      !passive && typeof document !== 'undefined' && updateFocusedIds(getFocusedIds(document.activeElement));
    },
    [getFocusedIds, updateFocusedIds],
  );

  const handleFocus = useCallback<UseDeepFocusGroupResponse['handleFocus']>(
    event => {
      clearBlurTimeoutId.current && clearSafeTimeout(clearBlurTimeoutId.current);
      persistEvents && event.persist();
      updateFocusedIds(getFocusedIds(event.target as Element), event);
    },
    [clearSafeTimeout, getFocusedIds, persistEvents, updateFocusedIds],
  );

  const handleBlur = useCallback<UseDeepFocusGroupResponse['handleBlur']>(
    event => {
      persistEvents && event.persist();

      const blurCallback = (ids: string[] | undefined, event: React.FocusEvent<HTMLElement>) => {
        ids?.forEach(id => {
          onBlur && onBlur(id, event);
        });

        setFocusedIds(undefined);
        previousFocusedIds.current = undefined;
      };

      if (!getFocusedIds(event.relatedTarget as Element) && previousFocusedIds.current !== undefined) {
        if (blurDelay) {
          clearBlurTimeoutId.current = setSafeTimeout(() => blurCallback(previousFocusedIds.current, event), blurDelay);
        } else {
          blurCallback(previousFocusedIds.current, event);
        }
      }
    },
    [blurDelay, getFocusedIds, onBlur, persistEvents, setSafeTimeout],
  );

  previousResponse.current = produce(previousResponse.current, draftState => {
    draftState.addRef = addRef;
    draftState.handleBlur = handleBlur;
    draftState.handleFocus = handleFocus;
    draftState.isIdFocused = isIdFocused;
    draftState.removeRef = removeRef;
  });
  return previousResponse.current;
}
