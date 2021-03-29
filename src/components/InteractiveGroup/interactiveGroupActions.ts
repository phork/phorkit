import { InteractiveGroupItemType } from './types';

export enum interactiveGroupActions {
  CLEAR = 'CLEAR',
  FOCUS_FIRST = 'FOCUS_FIRST',
  FOCUS_LAST = 'FOCUS_LAST',
  FOCUS_NEXT = 'FOCUS_NEXT',
  FOCUS_PREVIOUS = 'FOCUS_PREVIOUS',
  RESET = 'RESET',
  SELECT_FIRST = 'SELECT_FIRST',
  SELECT_FOCUSED = 'SELECT_FOCUSED',
  SELECT_LAST = 'SELECT_LAST',
  SELECT_NEXT = 'SELECT_NEXT',
  SELECT_PREVIOUS = 'SELECT_PREVIOUS',
  SET_FOCUSED = 'SET_FOCUSED',
  SET_ITEMS = 'SET_ITEMS',
  SET_SELECTED = 'SET_SELECTED',
  TOGGLE_SELECTED_FOCUSED = 'TOGGLE_SELECTED_FOCUSED',
  TOGGLE_SELECTED = 'TOGGLE_SELECTED',
  UNSET_SELECTED = 'UNSET_SELECTED',
}

export type InteractiveGroupEventTypes = { event?: React.SyntheticEvent | KeyboardEvent };

export type InteractiveGroupStateActionClear = InteractiveGroupEventTypes & {
  timestamp: number;
  type: interactiveGroupActions.CLEAR;
};

export type InteractiveGroupStateActionFocus = InteractiveGroupEventTypes & {
  timestamp: number;
  type:
    | interactiveGroupActions.FOCUS_FIRST
    | interactiveGroupActions.FOCUS_LAST
    | interactiveGroupActions.FOCUS_NEXT
    | interactiveGroupActions.FOCUS_PREVIOUS;
};

export type InteractiveGroupStateActionReset = {
  type: interactiveGroupActions.RESET;
};

export type InteractiveGroupStateActionSelect = InteractiveGroupEventTypes & {
  allowMultiSelect?: boolean;
  timestamp: number;
  type:
    | interactiveGroupActions.SELECT_FIRST
    | interactiveGroupActions.SELECT_LAST
    | interactiveGroupActions.SELECT_NEXT
    | interactiveGroupActions.SELECT_PREVIOUS;
};

export type InteractiveGroupStateActionSelectFocused = InteractiveGroupEventTypes & {
  allowMultiSelect?: boolean;
  allowReselect?: boolean;
  disableUnselect?: boolean;
  timestamp: number;
  type: interactiveGroupActions.SELECT_FOCUSED;
};

export type InteractiveGroupStateActionSetFocused = InteractiveGroupEventTypes & {
  focusedIndex?: number;
  timestamp: number;
  type: interactiveGroupActions.SET_FOCUSED;
};

export type InteractiveGroupStateActionSetItems = {
  items: InteractiveGroupItemType[];
  timestamp: number;
  type: interactiveGroupActions.SET_ITEMS;
};

export type InteractiveGroupStateActionSetSelected = InteractiveGroupEventTypes & {
  allowMultiSelect?: boolean;
  allowReselect?: boolean;
  selectedId: string;
  timestamp: number;
  type: interactiveGroupActions.SET_SELECTED;
};

export type InteractiveGroupStateActionToggleSelectedFocused = InteractiveGroupEventTypes & {
  allowMultiSelect?: boolean;
  allowReselect?: boolean;
  disableUnselect?: boolean;
  timestamp: number;
  type: interactiveGroupActions.TOGGLE_SELECTED_FOCUSED;
};

export type InteractiveGroupStateActionToggleSelected = InteractiveGroupEventTypes & {
  allowMultiSelect?: boolean;
  allowReselect?: boolean;
  disableUnselect?: boolean;
  selectedId: string;
  timestamp: number;
  type: interactiveGroupActions.TOGGLE_SELECTED;
};

export type InteractiveGroupStateActionUnsetSelected = InteractiveGroupEventTypes & {
  allowMultiSelect?: boolean;
  disableUnselect?: boolean;
  selectedId: string;
  timestamp: number;
  type: interactiveGroupActions.UNSET_SELECTED;
};

export type InteractiveGroupStateAction =
  | InteractiveGroupStateActionClear
  | InteractiveGroupStateActionFocus
  | InteractiveGroupStateActionReset
  | InteractiveGroupStateActionSelect
  | InteractiveGroupStateActionSelectFocused
  | InteractiveGroupStateActionSetFocused
  | InteractiveGroupStateActionSetItems
  | InteractiveGroupStateActionSetSelected
  | InteractiveGroupStateActionToggleSelectedFocused
  | InteractiveGroupStateActionToggleSelected
  | InteractiveGroupStateActionUnsetSelected;
