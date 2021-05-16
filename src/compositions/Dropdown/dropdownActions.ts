export enum dropdownActions {
  CLEAR_FILTER = 'CLEAR_FILTER',
  HIDE_DROPDOWN = 'HIDE_DROPDOWN',
  SET_BUSY = 'SET_BUSY',
  SET_CLEAR_FOCUS = 'SET_CLEAR_FOCUS',
  SET_FILTER = 'SET_FILTER',
  SET_INPUT_FOCUS = 'SET_INPUT_FOCUS',
  SET_LIST_FOCUS = 'SET_LIST_FOCUS',
  SHOW_DROPDOWN = 'SHOW_DROPDOWN',
  TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN',
  UNSET_BUSY = 'UNSET_BUSY',
  UNSET_CLEAR_FOCUS = 'UNSET_CLEAR_FOCUS',
  UNSET_INPUT_FOCUS = 'UNSET_INPUT_FOCUS',
  UNSET_LIST_FOCUS = 'UNSET_LIST_FOCUS',
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

export type DropdownStateActionSetClearFocus = {
  type: dropdownActions.SET_CLEAR_FOCUS;
};

export type DropdownStateActionSetFilter = {
  type: dropdownActions.SET_FILTER;
  input: string;
};

export type DropdownStateActionSetInputFocus = {
  type: dropdownActions.SET_INPUT_FOCUS;
};

export type DropdownStateActionSetListFocus = {
  type: dropdownActions.SET_LIST_FOCUS;
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

export type DropdownStateActionUnsetClearFocus = {
  type: dropdownActions.UNSET_CLEAR_FOCUS;
};

export type DropdownStateActionUnsetInputFocus = {
  type: dropdownActions.UNSET_INPUT_FOCUS;
};

export type DropdownStateActionUnsetListFocus = {
  type: dropdownActions.UNSET_LIST_FOCUS;
};

export type DropdownStateAction =
  | DropdownStateActionClearFilter
  | DropdownStateActionHideDropdown
  | DropdownStateActionSetBusy
  | DropdownStateActionSetClearFocus
  | DropdownStateActionSetFilter
  | DropdownStateActionSetInputFocus
  | DropdownStateActionSetListFocus
  | DropdownStateActionShowDropdown
  | DropdownStateActionToggleDropdown
  | DropdownStateActionUnsetBusy
  | DropdownStateActionUnsetClearFocus
  | DropdownStateActionUnsetInputFocus
  | DropdownStateActionUnsetListFocus;
