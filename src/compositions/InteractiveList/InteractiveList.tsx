import React, { Reducer, useEffect, useReducer } from 'react';
import {
  getInteractiveGroupInitialState,
  InteractiveGroupState,
  InteractiveGroupStateAction,
  interactiveGroupReducer,
  InteractiveGroupProviderProps,
  interactiveGroupActions as ACTIONS,
} from '../../components/InteractiveGroup';
import { InteractiveListItemProps } from './InteractiveListItem';
import { PartialInteractiveList, PartialInteractiveListProps } from './PartialInteractiveList';

export type InteractiveListProps = Omit<PartialInteractiveListProps, 'reducer'> &
  Pick<InteractiveGroupProviderProps, 'initialSelected'> & {
    items: readonly Omit<
      InteractiveListItemProps,
      'focused' | 'mimicSelectOnFocus' | 'onClick' | 'selected' | 'transparent' | 'unstyled'
    >[];
  };

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
 * The interactive list is a wrapper around the
 * `PartialInteractiveList` component for which it
 * provides the reducer used to track the selected
 * and focused item(s).
 *
 * Keyboard navigation is available for this component.
 * Navigate with `Up`, `Down`, `Left`, `Right`, `Home`
 * or `End`. Toggle with `Space`. Select with `Enter`.
 *
 * This uses the `InteractiveGroup` component.
 */
export const InteractiveList = React.forwardRef(InteractiveListBase);

// note that the base element cannot have a displayName because it breaks Storybook
InteractiveList.displayName = 'InteractiveList';
