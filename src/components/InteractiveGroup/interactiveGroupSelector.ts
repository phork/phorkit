import { InteractiveGroupState } from './interactiveGroupReducer';
import { InteractiveGroupItemId } from './types';

export const selectItems = <T extends InteractiveGroupItemId = string>(state: InteractiveGroupState<T>) => state.items;

export const selectEvents = <T extends InteractiveGroupItemId = string>(state: InteractiveGroupState<T>) =>
  state.events;

export const selectTimes = <T extends InteractiveGroupItemId = string>(state: InteractiveGroupState<T>) => state.times;

export const selectFocusedIndex = <T extends InteractiveGroupItemId = string>(state: InteractiveGroupState<T>) =>
  state.focusedIndex;

export const selectSelectedIds = <T extends InteractiveGroupItemId = string>(state: InteractiveGroupState<T>) =>
  state.selectedIds;

export const selectTriggeredId = <T extends InteractiveGroupItemId = string>(state: InteractiveGroupState<T>) =>
  state.triggeredId;

export const selectFocusedItem = <T extends InteractiveGroupItemId = string>(state: InteractiveGroupState<T>) =>
  selectItems<T>(state).at(selectFocusedIndex(state) || -1);

export const selectTriggeredItem = <T extends InteractiveGroupItemId = string>(state: InteractiveGroupState<T>) =>
  selectItems<T>(state).getItemById(selectTriggeredId<T>(state));

export const selectFocusedEvent = <T extends InteractiveGroupItemId = string>(state: InteractiveGroupState<T>) =>
  selectEvents<T>(state).focused;

export const selectSelectedEvent = <T extends InteractiveGroupItemId = string>(state: InteractiveGroupState<T>) =>
  selectEvents<T>(state).selected;

export const selectUnselectedEvent = <T extends InteractiveGroupItemId = string>(state: InteractiveGroupState<T>) =>
  selectEvents<T>(state).unselected;

export const selectTriggeredEvent = <T extends InteractiveGroupItemId = string>(state: InteractiveGroupState<T>) =>
  selectEvents<T>(state).triggered;

export const selectClearedEvent = <T extends InteractiveGroupItemId = string>(state: InteractiveGroupState<T>) =>
  selectEvents<T>(state).cleared;

export const selectFocusedTime = <T extends InteractiveGroupItemId = string>(state: InteractiveGroupState<T>) =>
  selectTimes<T>(state).focused;

export const selectSelectedTime = <T extends InteractiveGroupItemId = string>(state: InteractiveGroupState<T>) =>
  selectTimes<T>(state).selected;

export const selectUnselectedTime = <T extends InteractiveGroupItemId = string>(state: InteractiveGroupState<T>) =>
  selectTimes<T>(state).unselected;

export const selectTriggeredTime = <T extends InteractiveGroupItemId = string>(state: InteractiveGroupState<T>) =>
  selectTimes<T>(state).triggered;

export const selectClearedTime = <T extends InteractiveGroupItemId = string>(state: InteractiveGroupState<T>) =>
  selectTimes<T>(state).cleared;
