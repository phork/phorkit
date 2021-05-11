import {
  interactiveGroupActions as ACTIONS,
  InteractiveGroupStateAction,
  InteractiveGroupEventTypes,
} from './interactiveGroupActions';
import { InteractiveGroupItemType } from './types';

export type GeneratedInteractiveGroupActions = {
  setItems: (items: InteractiveGroupItemType[]) => void;
  setFocusedByIndex: (index: number | undefined, props: InteractiveGroupEventTypes) => void;
  setSelected: (id: string, props?: InteractiveGroupEventTypes) => void;
  unsetSelected: (id: string, props?: InteractiveGroupEventTypes) => void;
  toggleSelected: (id: string, props?: InteractiveGroupEventTypes) => void;
  selectFocused: (props: InteractiveGroupEventTypes) => void;
  toggleSelectedFocused: (props: InteractiveGroupEventTypes) => void;
  selectPrevious: (props: InteractiveGroupEventTypes) => void;
  focusPrevious: (props: InteractiveGroupEventTypes) => void;
  selectNext: (props: InteractiveGroupEventTypes) => void;
  focusNext: (props: InteractiveGroupEventTypes) => void;
  selectFirst: (props: InteractiveGroupEventTypes) => void;
  focusFirst: (props: InteractiveGroupEventTypes) => void;
  selectLast: (props: InteractiveGroupEventTypes) => void;
  focusLast: (props: InteractiveGroupEventTypes) => void;
};

export function generateInteractiveGroupActions(
  dispatch: React.Dispatch<InteractiveGroupStateAction>,
  disableUnselect?: boolean,
  allowMultiSelect?: boolean,
  allowReselect?: boolean,
): GeneratedInteractiveGroupActions {
  return {
    setItems: items =>
      dispatch({
        items,
        timestamp: Date.now(),
        type: ACTIONS.SET_ITEMS,
      }),

    setFocusedByIndex: (index, { event } = {}) =>
      dispatch({
        event,
        focusedIndex: index || 0,
        timestamp: Date.now(),
        type: ACTIONS.SET_FOCUSED,
      }),

    setSelected: (id, { event } = {}) =>
      dispatch({
        allowMultiSelect,
        event,
        selectedId: id,
        timestamp: Date.now(),
        type: ACTIONS.SET_SELECTED,
      }),

    unsetSelected: (id, { event } = {}) =>
      dispatch({
        allowMultiSelect,
        disableUnselect,
        event,
        selectedId: id,
        timestamp: Date.now(),
        type: ACTIONS.UNSET_SELECTED,
      }),

    toggleSelected: (id, { event } = {}) =>
      dispatch({
        allowMultiSelect,
        allowReselect,
        disableUnselect,
        event,
        selectedId: id,
        timestamp: Date.now(),
        type: ACTIONS.TOGGLE_SELECTED,
      }),

    selectFocused: ({ event }) =>
      dispatch({
        allowMultiSelect,
        disableUnselect,
        event,
        timestamp: Date.now(),
        type: ACTIONS.SELECT_FOCUSED,
      }),

    toggleSelectedFocused: ({ event }) =>
      dispatch({
        allowMultiSelect,
        allowReselect,
        disableUnselect,
        event,
        timestamp: Date.now(),
        type: ACTIONS.TOGGLE_SELECTED_FOCUSED,
      }),

    selectPrevious: ({ event }) =>
      dispatch({
        allowMultiSelect,
        event,
        timestamp: Date.now(),
        type: ACTIONS.SELECT_PREVIOUS,
      }),

    focusPrevious: ({ event }) =>
      dispatch({
        event,
        timestamp: Date.now(),
        type: ACTIONS.FOCUS_PREVIOUS,
      }),

    selectNext: ({ event }) =>
      dispatch({
        allowMultiSelect,
        event,
        timestamp: Date.now(),
        type: ACTIONS.SELECT_NEXT,
      }),

    focusNext: ({ event }) =>
      dispatch({
        event,
        timestamp: Date.now(),
        type: ACTIONS.FOCUS_NEXT,
      }),

    selectFirst: ({ event }) =>
      dispatch({
        allowMultiSelect,
        event,
        timestamp: Date.now(),
        type: ACTIONS.SELECT_FIRST,
      }),

    focusFirst: ({ event }) =>
      dispatch({
        event,
        timestamp: Date.now(),
        type: ACTIONS.FOCUS_FIRST,
      }),

    selectLast: ({ event }) =>
      dispatch({
        allowMultiSelect,
        event,
        timestamp: Date.now(),
        type: ACTIONS.SELECT_LAST,
      }),

    focusLast: ({ event }) =>
      dispatch({
        event,
        timestamp: Date.now(),
        type: ACTIONS.FOCUS_LAST,
      }),
  };
}
