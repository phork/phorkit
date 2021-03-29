import { InteractiveGroupState } from './interactiveGroupReducer';

export const selectItems = (state: InteractiveGroupState) => state.items;
export const selectEvents = (state: InteractiveGroupState) => state.events;
export const selectTimes = (state: InteractiveGroupState) => state.times;
export const selectFocusedIndex = (state: InteractiveGroupState) => state.focusedIndex;
export const selectSelectedId = (state: InteractiveGroupState) => state.selectedId;
export const selectTriggeredId = (state: InteractiveGroupState) => state.triggeredId;

export const selectFocusedItem = (state: InteractiveGroupState) =>
  selectItems(state).at(selectFocusedIndex(state) || -1);

export const selectSelectedItem = (state: InteractiveGroupState) => {
  const selectedId = selectSelectedId(state);
  return Array.isArray(selectedId)
    ? selectItems(state).getItemByIds(selectedId)
    : selectItems(state).getItemById(selectedId);
};

export const selectTriggeredItem = (state: InteractiveGroupState) =>
  selectItems(state).getItemById(selectTriggeredId(state));

export const selectFocusedEvent = (state: InteractiveGroupState) => selectEvents(state).focused;
export const selectSelectedEvent = (state: InteractiveGroupState) => selectEvents(state).selected;
export const selectUnselectedEvent = (state: InteractiveGroupState) => selectEvents(state).unselected;
export const selectTriggeredEvent = (state: InteractiveGroupState) => selectEvents(state).triggered;
export const selectClearedEvent = (state: InteractiveGroupState) => selectEvents(state).cleared;

export const selectFocusedTime = (state: InteractiveGroupState) => selectTimes(state).focused;
export const selectSelectedTime = (state: InteractiveGroupState) => selectTimes(state).selected;
export const selectUnselectedTime = (state: InteractiveGroupState) => selectTimes(state).unselected;
export const selectTriggeredTime = (state: InteractiveGroupState) => selectTimes(state).triggered;
export const selectClearedTime = (state: InteractiveGroupState) => selectTimes(state).cleared;
