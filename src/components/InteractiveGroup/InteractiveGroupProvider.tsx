import React, { Reducer, useEffect, useReducer } from 'react';
import {
  PartialInteractiveGroupProvider,
  PartialInteractiveGroupProviderProps,
} from './PartialInteractiveGroupProvider';
import { InteractiveGroupStateAction, interactiveGroupActions as ACTIONS } from './interactiveGroupActions';
import {
  interactiveGroupReducer,
  getInteractiveGroupInitialState,
  InteractiveGroupState,
} from './interactiveGroupReducer';
import { InteractiveGroupItemId, InteractiveGroupItemType } from './types';

export type InteractiveGroupProviderProps<
  T extends InteractiveGroupItemId = string,
  E extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLElement,
> = Omit<PartialInteractiveGroupProviderProps<T, E, I>, 'reducer'> & {
  /** The initially selected items are only used when the component renders and is then taken over by the state */
  initialSelected?: readonly T[];
  items: readonly InteractiveGroupItemType<T>[];
};

/**
 * The interactive group provider is a wrapper around
 * the `PartialInteractiveGroupProvider`. It creates
 * the reducer and passes it to the partial interactive
 * group provider. It also updates the items in the
 * state if they change.
 *
 * The `PartialInteractiveGroupProvider` should be
 * used if a parent also needs access to the state and
 * reducer.
 *
 * The `initialSelected` prop can be used to set up which
 * items are selected on load, but after that the state is
 * stored internally. The `onSelectionChange`, `onSelect` or
 * `onUnselect` callbacks can be used by the parent.
 *
 * @template T,E,I
 * @param {T} - The type of item IDs allowed
 * @param {E} - The HTML element type that the returned ref gets attached to
 * @param {I} - The HTML element type of the items
 */
export function InteractiveGroupProvider<
  T extends InteractiveGroupItemId = string,
  E extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLElement,
>({ initialSelected, items, ...props }: InteractiveGroupProviderProps<T, E, I>): React.ReactElement {
  const reducer = useReducer<Reducer<InteractiveGroupState<T>, InteractiveGroupStateAction<T>>>(
    interactiveGroupReducer,
    getInteractiveGroupInitialState({ items, selectedIds: initialSelected }),
  );

  const [, dispatch] = reducer;

  // watch for item changes and updates the reducer with the new items
  useEffect(() => {
    dispatch({
      items: items || [],
      timestamp: Date.now(),
      type: ACTIONS.SET_ITEMS,
    });
  }, [dispatch, items]);

  return <PartialInteractiveGroupProvider<T, E, I> reducer={reducer} {...props} />;
}

InteractiveGroupProvider.displayName = 'InteractiveGroupProvider';
