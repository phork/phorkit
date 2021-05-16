import React, { Reducer, useReducer } from 'react';
import { InteractiveGroupStateAction } from '../../components/InteractiveGroup/interactiveGroupActions';
import {
  getInteractiveGroupInitialState,
  interactiveGroupReducer,
  InteractiveGroupState,
} from '../../components/InteractiveGroup/interactiveGroupReducer';
import { Dropdown, DropdownProps } from './Dropdown';
import { DropdownOption } from './types';

export interface ManagedDropdownProps extends Omit<DropdownProps, 'reducer'> {
  initialSelected: DropdownOption[];
}

/** The dropdown is a controlled component */
function ManagedDropdownBase(
  { initialSelected, options, ...props }: ManagedDropdownProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
): React.ReactElement<ManagedDropdownProps, 'div'> {
  const reducer = useReducer<Reducer<InteractiveGroupState<string>, InteractiveGroupStateAction<string>>>(
    interactiveGroupReducer,
    getInteractiveGroupInitialState({ items: [], selectedIds: initialSelected?.map(({ id }) => id) }),
  );

  return <Dropdown options={options} reducer={reducer} ref={forwardedRef} {...props} />;
}

export const ManagedDropdown = React.forwardRef(ManagedDropdownBase) as typeof ManagedDropdownBase;

ManagedDropdownBase.displayName = 'ManagedDropdownBase';
ManagedDropdown.displayName = 'ManagedDropdown';
