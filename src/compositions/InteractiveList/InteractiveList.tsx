import React, { Reducer, useEffect, useReducer } from 'react';
import {
  getInteractiveGroupInitialState,
  InteractiveGroupState,
  InteractiveGroupStateAction,
  interactiveGroupReducer,
  InteractiveGroupProviderProps,
  interactiveGroupActions as ACTIONS,
} from '../../components/InteractiveGroup';
import { PartialInteractiveList, PartialInteractiveListProps } from './PartialInteractiveList';

export type InteractiveListProps = Omit<PartialInteractiveListProps, 'reducer'> &
  Pick<InteractiveGroupProviderProps, 'initialSelected'>;

export function InteractiveListBase(
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

  return <PartialInteractiveList reducer={reducer} ref={forwardedRef} {...props} />;
}

/**
 * The interactive list is a wrapper around the partial
 * interactive list for which it provides the reducer
 * used to track the selected and focused item(s).
 */
export const InteractiveList = React.forwardRef(InteractiveListBase);

InteractiveListBase.displayName = 'InteractiveListBase';
InteractiveList.displayName = 'InteractiveList';
