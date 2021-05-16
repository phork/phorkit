import {
  interactiveGroupActions as ACTIONS,
  InteractiveGroupStateAction,
  InteractiveGroupEventTypes,
} from './interactiveGroupActions';
import { InteractiveGroupItemId, InteractiveGroupItemType } from './types';

export type GeneratedInteractiveGroupActions<T extends InteractiveGroupItemId = string> = {
  focusFirst: (props: InteractiveGroupEventTypes) => void;
  focusLast: (props: InteractiveGroupEventTypes) => void;
  focusNext: (props: InteractiveGroupEventTypes) => void;
  focusPrevious: (props: InteractiveGroupEventTypes) => void;
  selectFirst: (props: InteractiveGroupEventTypes) => void;
  selectFocused: (props: InteractiveGroupEventTypes) => void;
  selectId: (id: T, props?: InteractiveGroupEventTypes) => void;
  selectLast: (props: InteractiveGroupEventTypes) => void;
  selectNext: (props: InteractiveGroupEventTypes) => void;
  selectPrevious: (props: InteractiveGroupEventTypes) => void;
  setFocusedByIndex: (index: number | undefined, props: InteractiveGroupEventTypes) => void;
  setItems: (items: InteractiveGroupItemType<T>[]) => void;
  toggleSelected: (id: T, props?: InteractiveGroupEventTypes) => void;
  toggleSelectedFocused: (props: InteractiveGroupEventTypes) => void;
  unselectId: (id: T, props?: InteractiveGroupEventTypes) => void;
};

export function generateInteractiveGroupActions<T extends InteractiveGroupItemId = string>(
  dispatch: React.Dispatch<InteractiveGroupStateAction<T>>,
  minSelect: number,
  maxSelect: number,
  allowReselect?: boolean,
): GeneratedInteractiveGroupActions<T> {
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

    selectId: (id, { event } = {}) =>
      dispatch({
        event,
        id,
        maxSelect,
        timestamp: Date.now(),
        type: ACTIONS.SELECT_ID,
      }),

    unselectId: (id, { event } = {}) =>
      dispatch({
        event,
        id,
        minSelect,
        timestamp: Date.now(),
        type: ACTIONS.UNSELECT_ID,
      }),

    toggleSelected: (id, { event } = {}) =>
      dispatch({
        allowReselect,
        event,
        id,
        minSelect,
        maxSelect,
        timestamp: Date.now(),
        type: ACTIONS.TOGGLE_SELECTED,
      }),

    selectFocused: ({ event }) =>
      dispatch({
        event,
        maxSelect,
        timestamp: Date.now(),
        type: ACTIONS.SELECT_FOCUSED,
      }),

    toggleSelectedFocused: ({ event }) =>
      dispatch({
        allowReselect,
        event,
        minSelect,
        maxSelect,
        timestamp: Date.now(),
        type: ACTIONS.TOGGLE_SELECTED_FOCUSED,
      }),

    selectPrevious: ({ event }) =>
      dispatch({
        maxSelect,
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
        event,
        maxSelect,
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
        event,
        maxSelect,
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
        event,
        maxSelect,
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
