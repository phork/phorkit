import { InteractiveGroupItems } from './interactiveGroupItemsFactory';
import { InteractiveGroupState } from './interactiveGroupReducer';
import { InteractiveGroupItemId, InteractiveGroupItemType } from './types';

export const selectItems = <T extends InteractiveGroupItemId = string>(
  state: InteractiveGroupState<T>,
): InteractiveGroupItems<T> => state.items;

export const selectEvents = <T extends InteractiveGroupItemId = string>(
  state: InteractiveGroupState<T>,
): InteractiveGroupState<T>['events'] => state.events;

export const selectTimes = <T extends InteractiveGroupItemId = string>(
  state: InteractiveGroupState<T>,
): InteractiveGroupState<T>['times'] => state.times;

export const selectFocusedIndex = <T extends InteractiveGroupItemId = string>(
  state: InteractiveGroupState<T>,
): InteractiveGroupState<T>['focusedIndex'] => state.focusedIndex;

export const selectSelectedIds = <T extends InteractiveGroupItemId = string>(
  state: InteractiveGroupState<T>,
): InteractiveGroupState<T>['selectedIds'] => state.selectedIds;

export const selectTriggeredId = <T extends InteractiveGroupItemId = string>(
  state: InteractiveGroupState<T>,
): InteractiveGroupState<T>['triggeredId'] => state.triggeredId;

export const selectFocusedItem = <T extends InteractiveGroupItemId = string>(
  state: InteractiveGroupState<T>,
): InteractiveGroupItemType<T> => selectItems<T>(state).at(selectFocusedIndex(state) || -1);

export const selectTriggeredItem = <T extends InteractiveGroupItemId = string>(
  state: InteractiveGroupState<T>,
): InteractiveGroupItemType<T> | undefined => selectItems<T>(state).getItemById(selectTriggeredId<T>(state));

export const selectFocusedEvent = <T extends InteractiveGroupItemId = string>(
  state: InteractiveGroupState<T>,
): InteractiveGroupState<T>['events']['focused'] => selectEvents<T>(state).focused;

export const selectSelectedEvent = <T extends InteractiveGroupItemId = string>(
  state: InteractiveGroupState<T>,
): InteractiveGroupState<T>['events']['selected'] => selectEvents<T>(state).selected;

export const selectUnselectedEvent = <T extends InteractiveGroupItemId = string>(
  state: InteractiveGroupState<T>,
): InteractiveGroupState<T>['events']['unselected'] => selectEvents<T>(state).unselected;

export const selectTriggeredEvent = <T extends InteractiveGroupItemId = string>(
  state: InteractiveGroupState<T>,
): InteractiveGroupState<T>['events']['triggered'] => selectEvents<T>(state).triggered;

export const selectClearedEvent = <T extends InteractiveGroupItemId = string>(
  state: InteractiveGroupState<T>,
): InteractiveGroupState<T>['events']['cleared'] => selectEvents<T>(state).cleared;

export const selectFocusedTime = <T extends InteractiveGroupItemId = string>(
  state: InteractiveGroupState<T>,
): number | undefined => selectTimes<T>(state).focused;

export const selectSelectedTime = <T extends InteractiveGroupItemId = string>(
  state: InteractiveGroupState<T>,
): number | undefined => selectTimes<T>(state).selected;

export const selectUnselectedTime = <T extends InteractiveGroupItemId = string>(
  state: InteractiveGroupState<T>,
): number | undefined => selectTimes<T>(state).unselected;

export const selectTriggeredTime = <T extends InteractiveGroupItemId = string>(
  state: InteractiveGroupState<T>,
): number | undefined => selectTimes<T>(state).triggered;

export const selectClearedTime = <T extends InteractiveGroupItemId = string>(
  state: InteractiveGroupState<T>,
): number | undefined => selectTimes<T>(state).cleared;
