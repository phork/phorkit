import React, { Reducer, useReducer } from 'react';
import { InteractiveGroupStateAction } from '../../components/InteractiveGroup/interactiveGroupActions';
import {
  getInteractiveGroupInitialState,
  interactiveGroupReducer,
  InteractiveGroupState,
} from '../../components/InteractiveGroup/interactiveGroupReducer';
import { Dropdown, DropdownHandles, DropdownProps } from './Dropdown';
import { DropdownOption } from './types';

export interface ControlledDropdownProps extends Omit<DropdownProps, 'reducer'> {
  initialSelected: DropdownOption[];
}

export function ControlledDropdownBase(
  { initialSelected, options, ...props }: ControlledDropdownProps,
  forwardedRef: React.ForwardedRef<DropdownHandles>,
): React.ReactElement<ControlledDropdownProps, 'div'> {
  const reducer = useReducer<Reducer<InteractiveGroupState<string>, InteractiveGroupStateAction<string>>>(
    interactiveGroupReducer,
    getInteractiveGroupInitialState({ items: [], selectedIds: initialSelected?.map(({ id }) => id) }),
  );

  return <Dropdown options={options} reducer={reducer} ref={forwardedRef} {...props} />;
}

export const ControlledDropdown = React.forwardRef(ControlledDropdownBase);

ControlledDropdownBase.displayName = 'ControlledDropdownBase';
ControlledDropdown.displayName = 'ControlledDropdown';
