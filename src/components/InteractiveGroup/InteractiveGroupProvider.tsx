import React, { Reducer, useReducer } from 'react';
import {
  UnmanagedInteractiveGroupProvider,
  UnmanagedInteractiveGroupProviderProps,
} from './UnmanagedInteractiveGroupProvider';
import { InteractiveGroupStateAction } from './interactiveGroupActions';
import {
  interactiveGroupReducer,
  getInteractiveGroupInitialState,
  InteractiveGroupState,
} from './interactiveGroupReducer';
import { InteractiveGroupItemId } from './types';

export interface InteractiveGroupProviderProps<
  T extends InteractiveGroupItemId = string,
  E extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLElement
> extends Omit<UnmanagedInteractiveGroupProviderProps<T, E, I>, 'reducer'> {}

/** The interactive group provider is a managed wrapper around the unmanaged interactive group provider */
export function InteractiveGroupProvider<
  T extends InteractiveGroupItemId = string,
  E extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLElement
>({ initialSelected, items, ...props }: InteractiveGroupProviderProps<T, E, I>): React.ReactElement {
  const reducer = useReducer<Reducer<InteractiveGroupState<T>, InteractiveGroupStateAction<T>>>(
    interactiveGroupReducer,
    getInteractiveGroupInitialState({ items, selectedIds: initialSelected }),
  );

  return <UnmanagedInteractiveGroupProvider<T, E, I> items={items} reducer={reducer} {...props} />;
}

InteractiveGroupProvider.displayName = 'InteractiveGroupProvider';
