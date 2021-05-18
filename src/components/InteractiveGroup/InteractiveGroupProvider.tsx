import React, { Reducer, useEffect, useReducer } from 'react';
import {
  UncontrolledInteractiveGroupProvider,
  UncontrolledInteractiveGroupProviderProps,
} from './UncontrolledInteractiveGroupProvider';
import { InteractiveGroupStateAction, interactiveGroupActions as ACTIONS } from './interactiveGroupActions';
import {
  interactiveGroupReducer,
  getInteractiveGroupInitialState,
  InteractiveGroupState,
} from './interactiveGroupReducer';
import { InteractiveGroupItemId, InteractiveGroupItemType } from './types';

export interface InteractiveGroupProviderProps<
  T extends InteractiveGroupItemId = string,
  E extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLElement
> extends Omit<UncontrolledInteractiveGroupProviderProps<T, E, I>, 'reducer'> {
  initialSelected?: T[];
  items: InteractiveGroupItemType<T>[];
}

/** The interactive group provider is a wrapper around the uncontrolled interactive group provider */
export function InteractiveGroupProvider<
  T extends InteractiveGroupItemId = string,
  E extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLElement
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

  return <UncontrolledInteractiveGroupProvider<T, E, I> reducer={reducer} {...props} />;
}

InteractiveGroupProvider.displayName = 'InteractiveGroupProvider';
