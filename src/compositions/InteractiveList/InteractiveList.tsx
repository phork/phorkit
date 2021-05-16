import React, { Reducer, useEffect, useReducer } from 'react';
import {
  getInteractiveGroupInitialState,
  InteractiveGroupState,
  InteractiveGroupStateAction,
  interactiveGroupReducer,
  InteractiveGroupProviderProps,
  interactiveGroupActions as ACTIONS,
} from '../../components/InteractiveGroup';
import { UnmanagedInteractiveList, UnmanagedInteractiveListProps } from './UnmanagedInteractiveList';

export type InteractiveListProps = Omit<UnmanagedInteractiveListProps, 'reducer'> &
  Pick<InteractiveGroupProviderProps, 'initialSelected'>;

/** The interactive list is a managed wrapper around the unmanaged interactive list */
function InteractiveListBase(
  { initialSelected, items, ...props }: InteractiveListProps,
  forwardedRef: React.ForwardedRef<HTMLUListElement>,
): React.ReactElement {
  const reducer = useReducer<Reducer<InteractiveGroupState<string>, InteractiveGroupStateAction<string>>>(
    interactiveGroupReducer,
    getInteractiveGroupInitialState({ items, selectedIds: initialSelected }),
  );

  const [, dispatch] = reducer;

  // this is a managed component so we must watch for items changes
  useEffect(() => {
    dispatch({
      items: items || [],
      timestamp: Date.now(),
      type: ACTIONS.SET_ITEMS,
    });
  }, [dispatch, items]);

  return <UnmanagedInteractiveList reducer={reducer} ref={forwardedRef} {...props} />;
}

export const InteractiveList = React.forwardRef(InteractiveListBase) as typeof InteractiveListBase;

InteractiveListBase.displayName = 'InteractiveListBase';
InteractiveList.displayName = 'InteractiveList';
