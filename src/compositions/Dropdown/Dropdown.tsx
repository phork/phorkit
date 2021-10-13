import React, { Reducer, useReducer } from 'react';
import { InteractiveGroupStateAction } from '../../components/InteractiveGroup/interactiveGroupActions';
import {
  getInteractiveGroupInitialState,
  interactiveGroupReducer,
  InteractiveGroupState,
} from '../../components/InteractiveGroup/interactiveGroupReducer';
import { PartialDropdown, PartialDropdownHandles, PartialDropdownProps } from './PartialDropdown';
import { DropdownOption } from './types';

export type DropdownProps = Omit<PartialDropdownProps, 'reducer'> & {
  initialSelected: readonly DropdownOption[];
};

export function DropdownBase(
  { initialSelected, options, ...props }: DropdownProps,
  forwardedRef: React.ForwardedRef<PartialDropdownHandles>,
): React.ReactElement<DropdownProps> {
  const reducer = useReducer<Reducer<InteractiveGroupState<string>, InteractiveGroupStateAction<string>>>(
    interactiveGroupReducer,
    getInteractiveGroupInitialState({ items: [], selectedIds: initialSelected?.map(({ id }) => id) }),
  );

  return <PartialDropdown options={options} reducer={reducer} ref={forwardedRef} {...props} />;
}

/**
 * A dropdown is similar to a select component in
 * that it provides a list of selectable items. The
 * items can be filtered or searched. A searchable
 * dropdown is similar to a filterable dropdown except
 * it starts with no initial values.
 *
 * This is a wrapper around the `PartialDropdown`
 * component for which it provides the reducer used
 * to track the selected and focused item(s) state.
 *
 * Keyboard navigation is available for this component.
 * Navigate with `Up`, `Down`, `Left`, `Right`, `Home`
 * or `End`. Toggle with `Space`. Select with `Enter`.
 *
 * This uses the `InteractiveGroup` component.
 */
export const Dropdown = React.forwardRef(DropdownBase);

// note that the base element cannot have a displayName because it breaks Storybook
Dropdown.displayName = 'Dropdown';
