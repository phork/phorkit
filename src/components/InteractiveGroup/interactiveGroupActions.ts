import { InteractiveGroupItemType, InteractiveGroupItemId } from './types';

export enum interactiveGroupActions {
  CLEAR = 'CLEAR',
  FOCUS_FIRST = 'FOCUS_FIRST',
  FOCUS_LAST = 'FOCUS_LAST',
  FOCUS_NEXT = 'FOCUS_NEXT',
  FOCUS_PREVIOUS = 'FOCUS_PREVIOUS',
  FOCUS_SELECTED = 'FOCUS_SELECTED',
  RESET = 'RESET',
  SELECT_FIRST = 'SELECT_FIRST',
  SELECT_FOCUSED = 'SELECT_FOCUSED',
  SELECT_ID = 'SELECT_ID',
  SELECT_LAST = 'SELECT_LAST',
  SELECT_NEXT = 'SELECT_NEXT',
  SELECT_PREVIOUS = 'SELECT_PREVIOUS',
  SET_FOCUSED = 'SET_FOCUSED',
  SET_ITEMS = 'SET_ITEMS',
  TOGGLE_SELECTED = 'TOGGLE_SELECTED',
  TOGGLE_SELECTED_FOCUSED = 'TOGGLE_SELECTED_FOCUSED',
  UNSELECT_ID = 'UNSELECT_ID',
}

export type InteractiveGroupEventTypes = { event?: React.SyntheticEvent | KeyboardEvent };

export type InteractiveGroupStateActionClear = InteractiveGroupEventTypes & {
  timestamp: number;
  type: interactiveGroupActions.CLEAR;
};

export type InteractiveGroupStateActionFocusSequential = InteractiveGroupEventTypes & {
  timestamp: number;
  type:
    | interactiveGroupActions.FOCUS_FIRST
    | interactiveGroupActions.FOCUS_LAST
    | interactiveGroupActions.FOCUS_NEXT
    | interactiveGroupActions.FOCUS_PREVIOUS;
};

export type InteractiveGroupStateActionFocusSelected = InteractiveGroupEventTypes & {
  timestamp: number;
  type: interactiveGroupActions.FOCUS_SELECTED;
};

export type InteractiveGroupStateActionReset = {
  type: interactiveGroupActions.RESET;
};

export type InteractiveGroupStateActionSelectSequential = InteractiveGroupEventTypes & {
  maxSelect: number;
  timestamp: number;
  type:
    | interactiveGroupActions.SELECT_FIRST
    | interactiveGroupActions.SELECT_LAST
    | interactiveGroupActions.SELECT_NEXT
    | interactiveGroupActions.SELECT_PREVIOUS;
};

export type InteractiveGroupStateActionSelectFocused = InteractiveGroupEventTypes & {
  allowReselect?: boolean;
  maxSelect: number;
  timestamp: number;
  type: interactiveGroupActions.SELECT_FOCUSED;
};

export type InteractiveGroupStateActionSetFocused = InteractiveGroupEventTypes & {
  focusedIndex?: number;
  timestamp: number;
  type: interactiveGroupActions.SET_FOCUSED;
};

export type InteractiveGroupStateActionSetItems<T extends InteractiveGroupItemId = string> = {
  items: readonly InteractiveGroupItemType<T>[];
  timestamp: number;
  type: interactiveGroupActions.SET_ITEMS;
};

export type InteractiveGroupStateActionSelectId<T extends InteractiveGroupItemId = string> =
  InteractiveGroupEventTypes & {
    allowReselect?: boolean;
    id: T;
    maxSelect: number;
    timestamp: number;
    type: interactiveGroupActions.SELECT_ID;
  };

export type InteractiveGroupStateActionToggleSelectedFocused = InteractiveGroupEventTypes & {
  allowReselect?: boolean;
  maxSelect: number;
  minSelect: number;
  timestamp: number;
  type: interactiveGroupActions.TOGGLE_SELECTED_FOCUSED;
};

export type InteractiveGroupStateActionToggleSelected<T extends InteractiveGroupItemId = string> =
  InteractiveGroupEventTypes & {
    allowReselect?: boolean;
    id: T;
    maxSelect: number;
    minSelect: number;
    timestamp: number;
    type: interactiveGroupActions.TOGGLE_SELECTED;
  };

export type InteractiveGroupStateActionUnselectId<T extends InteractiveGroupItemId = string> =
  InteractiveGroupEventTypes & {
    id: T;
    minSelect: number;
    timestamp: number;
    type: interactiveGroupActions.UNSELECT_ID;
  };

export type InteractiveGroupStateAction<T extends InteractiveGroupItemId = string> =
  | InteractiveGroupStateActionClear
  | InteractiveGroupStateActionFocusSequential
  | InteractiveGroupStateActionFocusSelected
  | InteractiveGroupStateActionReset
  | InteractiveGroupStateActionSelectSequential
  | InteractiveGroupStateActionSelectFocused
  | InteractiveGroupStateActionSetFocused
  | InteractiveGroupStateActionSetItems<T>
  | InteractiveGroupStateActionSelectId<T>
  | InteractiveGroupStateActionToggleSelectedFocused
  | InteractiveGroupStateActionToggleSelected<T>
  | InteractiveGroupStateActionUnselectId<T>;
