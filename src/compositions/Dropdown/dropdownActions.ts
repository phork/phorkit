export enum dropdownActions {
  CLEAR_FILTER = 'CLEAR_FILTER',
  HIDE_DROPDOWN = 'HIDE_DROPDOWN',
  SET_BUSY = 'SET_BUSY',
  SET_FILTER = 'SET_FILTER',
  SHOW_DROPDOWN = 'SHOW_DROPDOWN',
  TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN',
  UNSET_BUSY = 'UNSET_BUSY',
}

export type DropdownStateActionClearFilter = {
  type: dropdownActions.CLEAR_FILTER;
};

export type DropdownStateActionHideDropdown = {
  type: dropdownActions.HIDE_DROPDOWN;
};

export type DropdownStateActionSetBusy = {
  type: dropdownActions.SET_BUSY;
};

export type DropdownStateActionSetFilter = {
  type: dropdownActions.SET_FILTER;
  input: string;
};

export type DropdownStateActionShowDropdown = {
  type: dropdownActions.SHOW_DROPDOWN;
};

export type DropdownStateActionToggleDropdown = {
  type: dropdownActions.TOGGLE_DROPDOWN;
};

export type DropdownStateActionUnsetBusy = {
  type: dropdownActions.UNSET_BUSY;
};

export type DropdownStateAction =
  | DropdownStateActionClearFilter
  | DropdownStateActionHideDropdown
  | DropdownStateActionSetBusy
  | DropdownStateActionSetFilter
  | DropdownStateActionShowDropdown
  | DropdownStateActionToggleDropdown
  | DropdownStateActionUnsetBusy;
