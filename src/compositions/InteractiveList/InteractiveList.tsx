import React, { Reducer, useReducer } from 'react';
import {
  InteractiveGroupState,
  InteractiveGroupStateAction,
  interactiveGroupReducer,
  getInteractiveGroupInitialState,
} from '../../components/InteractiveGroup';
import { UnmanagedInteractiveList, UnmanagedInteractiveListProps } from './UnmanagedInteractiveList';

export type InteractiveListProps = Omit<UnmanagedInteractiveListProps, 'reducer'>;

/** The interactive list is a managed wrapper around the unmanaged interactive list */
function InteractiveListBase(
  { initialSelected, items, ...props }: InteractiveListProps,
  forwardedRef: React.ForwardedRef<HTMLUListElement>,
): React.ReactElement {
  const reducer = useReducer<Reducer<InteractiveGroupState<string>, InteractiveGroupStateAction<string>>>(
    interactiveGroupReducer,
    getInteractiveGroupInitialState({ items, selectedIds: initialSelected }),
  );

  return (
    <UnmanagedInteractiveList
      initialSelected={initialSelected}
      items={items}
      reducer={reducer}
      ref={forwardedRef}
      {...props}
    />
  );
}

export const InteractiveList = React.forwardRef(InteractiveListBase) as typeof InteractiveListBase;

InteractiveListBase.displayName = 'InteractiveListBase';
InteractiveList.displayName = 'InteractiveList';
