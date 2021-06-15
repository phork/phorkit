import React, { Reducer, useEffect, useReducer } from 'react';
import {
  getInteractiveGroupInitialState,
  InteractiveGroupState,
  InteractiveGroupStateAction,
  interactiveGroupReducer,
  InteractiveGroupProviderProps,
  interactiveGroupActions as ACTIONS,
} from '../../components/InteractiveGroup';
import { UncontrolledInteractiveList, UncontrolledInteractiveListProps } from './UncontrolledInteractiveList';

export type InteractiveListProps = Omit<UncontrolledInteractiveListProps, 'reducer'> &
  Pick<InteractiveGroupProviderProps, 'initialSelected'>;

/** The interactive list is a wrapper around the uncontrolled interactive list */
function InteractiveListBase(
  { initialSelected, items, ...props }: InteractiveListProps,
  forwardedRef: React.ForwardedRef<HTMLUListElement>,
): React.ReactElement {
  const reducer = useReducer<Reducer<InteractiveGroupState<string>, InteractiveGroupStateAction<string>>>(
    interactiveGroupReducer,
    getInteractiveGroupInitialState({ items, selectedIds: initialSelected }),
  );

  const [, dispatch] = reducer;

  // update the items in the reducer if the items change
  useEffect(() => {
    dispatch({
      items: items || [],
      timestamp: Date.now(),
      type: ACTIONS.SET_ITEMS,
    });
  }, [dispatch, items]);

  return <UncontrolledInteractiveList reducer={reducer} ref={forwardedRef} {...props} />;
}

export const InteractiveList = React.forwardRef(InteractiveListBase) as typeof InteractiveListBase;

InteractiveListBase.displayName = 'InteractiveListBase';
InteractiveList.displayName = 'InteractiveList';
