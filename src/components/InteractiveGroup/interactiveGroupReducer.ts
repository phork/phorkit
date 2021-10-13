import {
  interactiveGroupActions as ACTIONS,
  InteractiveGroupStateAction,
  InteractiveGroupEventTypes,
  InteractiveGroupStateActionUnselectId,
  InteractiveGroupStateActionSelectId,
  InteractiveGroupStateActionSelectFocused,
} from './interactiveGroupActions';
import { interactiveGroupItemsFactory, InteractiveGroupItems } from './interactiveGroupItemsFactory';
import { InteractiveGroupItemId, InteractiveGroupItemType } from './types';

export type InteractiveGroupState<T extends InteractiveGroupItemId> = {
  events: {
    cleared?: InteractiveGroupEventTypes['event'];
    focused?: InteractiveGroupEventTypes['event'];
    selected?: InteractiveGroupEventTypes['event'];
    unselected?: InteractiveGroupEventTypes['event'];
    triggered?: InteractiveGroupEventTypes['event'];
  };
  focusedIndex?: number;
  items: InteractiveGroupItems<T>;
  selectedIds: readonly T[];
  triggeredId?: T;
  times: {
    cleared?: number;
    focused?: number;
    selected?: number;
    triggered?: number;
    unselected?: number;
  };
};

export const getInteractiveGroupInitialState = <T extends InteractiveGroupItemId>({
  items: initialItems = [],
  selectedIds: initialSelectedIds = [],
}: {
  items?: readonly InteractiveGroupItemType<T>[];
  selectedIds?: readonly T[];
} = {}): InteractiveGroupState<T> => {
  const items = interactiveGroupItemsFactory(initialItems);
  const selectedIndex = items.getIndexByIds(initialSelectedIds);

  return {
    events: {},
    focusedIndex: (Array.isArray(selectedIndex) && selectedIndex[0]) || 0,
    items,
    selectedIds: initialSelectedIds,
    times: {},
  };
};

const isIdSelected = <T extends InteractiveGroupItemId>(state: InteractiveGroupState<T>, id: T): boolean =>
  (id !== undefined && state.selectedIds?.includes(id)) || false;

const getSelectedIdsIncludingId = <T extends InteractiveGroupItemId>(
  state: InteractiveGroupState<T>,
  id: T,
): readonly T[] => {
  if (!state.selectedIds.includes(id)) {
    return [...state.selectedIds, id];
  }
  return state.selectedIds;
};

const getSelectedIdsExcludingId = <T extends InteractiveGroupItemId>(
  state: InteractiveGroupState<T>,
  id: T,
): readonly T[] => {
  if (state.selectedIds.includes(id)) {
    return state.selectedIds.filter((i: InteractiveGroupItemId) => i !== id);
  }
  return state.selectedIds;
};

const getIndexByActionType = <T extends InteractiveGroupItemId>(
  state: InteractiveGroupState<T>,
  type: ACTIONS,
): number | undefined => {
  switch (type) {
    case ACTIONS.FOCUS_FIRST:
    case ACTIONS.SELECT_FIRST:
      return state.items.firstIndex();

    case ACTIONS.FOCUS_LAST:
    case ACTIONS.SELECT_LAST:
      return state.items.lastIndex();

    case ACTIONS.FOCUS_NEXT:
    case ACTIONS.SELECT_NEXT:
      return state.focusedIndex !== undefined ? state.items.nextIndex(state.focusedIndex) : undefined;

    case ACTIONS.FOCUS_PREVIOUS:
    case ACTIONS.SELECT_PREVIOUS:
      return state.focusedIndex !== undefined ? state.items.previousIndex(state.focusedIndex) : undefined;

    default:
      throw new Error('Invalid action type');
  }
};

/** This turns a toggle action into a select or unselect action based on its current state */
const forwardAction = <T extends InteractiveGroupItemId>(
  state = getInteractiveGroupInitialState<T>(),
  action: InteractiveGroupStateAction<T>,
): InteractiveGroupStateAction<T> => {
  if (action.type === ACTIONS.TOGGLE_SELECTED) {
    if (isIdSelected<T>(state, action.id) && !action.allowReselect) {
      return {
        ...action,
        type: ACTIONS.UNSELECT_ID,
      } as InteractiveGroupStateActionUnselectId<T>;
    }
    return {
      ...action,
      type: ACTIONS.SELECT_ID,
    } as InteractiveGroupStateActionSelectId<T>;
  }

  if (action.type === ACTIONS.TOGGLE_SELECTED_FOCUSED && state.focusedIndex !== undefined) {
    const focusedId = (state.items.at(state.focusedIndex) || {}).id;
    if (isIdSelected<T>(state, focusedId) && !action.allowReselect) {
      return {
        ...action,
        id: focusedId,
        type: ACTIONS.UNSELECT_ID,
      } as InteractiveGroupStateActionUnselectId<T>;
    }
    return {
      ...action,
      type: ACTIONS.SELECT_FOCUSED,
    } as InteractiveGroupStateActionSelectFocused;
  }
  return action;
};

// if only 1 item can be selected then we still allow for selection, but we must replace the item not add to it
const canSelectItem = <T extends InteractiveGroupItemId>(
  state = getInteractiveGroupInitialState<T>(),
  action: InteractiveGroupStateAction<T>,
): boolean => {
  if ('maxSelect' in action) {
    return !(action.maxSelect !== -1 && action.maxSelect !== 1 && state.selectedIds.length + 1 > action.maxSelect);
  }
  return true;
};

// if minSelect === maxSelect we have to allow unselect otherwise a different selection can't be added
const canUnselectItem = <T extends InteractiveGroupItemId>(
  state = getInteractiveGroupInitialState<T>(),
  action: InteractiveGroupStateAction<T>,
): boolean => {
  if ('minSelect' in action) {
    if ('maxSelect' in action && action.minSelect === action.maxSelect && action.minSelect !== 1) return true;
    return !(action.minSelect !== undefined && state.selectedIds.length - 1 < action.minSelect);
  }
  return true;
};

export function interactiveGroupReducer<T extends InteractiveGroupItemId>(
  state = getInteractiveGroupInitialState<T>(),
  initAction: InteractiveGroupStateAction<T>,
): InteractiveGroupState<T> {
  const action = forwardAction<T>(state, initAction);

  switch (action.type) {
    case ACTIONS.CLEAR:
      return {
        ...state,
        focusedIndex: undefined,
        selectedIds: [],
        triggeredId: undefined,
        events: {
          ...state.events,
          cleared: action.event,
        },
        times: {
          ...state.times,
          cleared: action.timestamp,
        },
      };

    case ACTIONS.FOCUS_FIRST:
    case ACTIONS.FOCUS_LAST:
    case ACTIONS.FOCUS_NEXT:
    case ACTIONS.FOCUS_PREVIOUS: {
      const focusedIndex = getIndexByActionType<T>(state, action.type);
      return {
        ...state,
        focusedIndex,
        events: {
          ...state.events,
          focused: action.event,
        },
        times: {
          ...state.times,
          focused: action.timestamp,
        },
      };
    }

    case ACTIONS.FOCUS_SELECTED: {
      return {
        ...state,
        focusedIndex: state.items.getIndexByIds(state.selectedIds)?.sort()[0] || 0,
        events: {
          ...state.events,
          focused: action.event,
        },
        times: {
          ...state.times,
          focused: action.timestamp,
        },
      };
    }

    case ACTIONS.RESET:
      return {
        ...getInteractiveGroupInitialState(),
      };

    case ACTIONS.SELECT_FIRST:
    case ACTIONS.SELECT_LAST:
    case ACTIONS.SELECT_NEXT:
    case ACTIONS.SELECT_PREVIOUS: {
      const focusedIndex = getIndexByActionType<T>(state, action.type);
      const item = focusedIndex !== undefined && state.items.at(focusedIndex);
      if (!item) return state;

      if (!canSelectItem<T>(state, action)) return state;

      const isTriggerOnly = state.items.isItemTriggerOnly(item);
      return {
        ...state,
        focusedIndex,
        ...(isTriggerOnly && { triggeredId: item.id }),
        ...(!isTriggerOnly && {
          selectedIds: action.maxSelect === 1 ? [item.id] : getSelectedIdsIncludingId<T>(state, item.id),
        }),
        events: {
          ...state.events,
          focused: action.event,
          [isTriggerOnly ? 'triggered' : 'selected']: action.event,
        },
        times: {
          ...state.times,
          focused: action.timestamp,
          [isTriggerOnly ? 'triggered' : 'selected']: action.timestamp,
        },
      };
    }

    case ACTIONS.SELECT_FOCUSED: {
      const item = state.focusedIndex !== undefined && state.items.at(state.focusedIndex);
      if (!item) return state;

      if (!canSelectItem<T>(state, action)) return state;

      const isTriggerOnly = state.items.isItemTriggerOnly(item);
      return {
        ...state,
        ...(isTriggerOnly && { triggeredId: item.id }),
        ...(!isTriggerOnly && {
          selectedIds: action.maxSelect === 1 ? [item.id] : getSelectedIdsIncludingId<T>(state, item.id),
        }),
        events: {
          ...state.events,
          [isTriggerOnly ? 'triggered' : 'selected']: action.event,
        },
        times: {
          ...state.times,
          [isTriggerOnly ? 'triggered' : 'selected']: action.timestamp,
        },
      };
    }

    case ACTIONS.SELECT_ID: {
      if (isIdSelected<T>(state, action.id) && !action.allowReselect) return state;

      if (!canSelectItem<T>(state, action)) return state;

      const focusedIndex = state.items.getIndexById(action.id) as number | undefined;
      const isTriggerOnly = focusedIndex !== undefined && state.items.isItemTriggerOnly(state.items.at(focusedIndex));
      return {
        ...state,
        focusedIndex,
        ...(isTriggerOnly && { triggeredId: action.id }),
        ...(!isTriggerOnly && {
          selectedIds: action.maxSelect === 1 ? [action.id] : getSelectedIdsIncludingId<T>(state, action.id),
        }),
        events: {
          ...state.events,
          [isTriggerOnly ? 'triggered' : 'selected']: action.event,
        },
        times: {
          ...state.times,
          [isTriggerOnly ? 'triggered' : 'selected']: action.timestamp,
        },
      };
    }

    case ACTIONS.SET_FOCUSED:
      return {
        ...state,
        focusedIndex: action.focusedIndex,
        events: {
          ...state.events,
          focused: action.event,
        },
        times: {
          ...state.times,
          focused: action.timestamp,
        },
      };

    case ACTIONS.SET_ITEMS:
      return {
        ...state,
        items: interactiveGroupItemsFactory(action.items),
      };

    case ACTIONS.UNSELECT_ID:
      if (!isIdSelected<T>(state, action.id)) return state;
      if (!canUnselectItem<T>(state, action)) return state;

      return {
        ...state,
        selectedIds: getSelectedIdsExcludingId<T>(state, action.id),
        events: {
          ...state.events,
          unselected: action.event,
        },
        times: {
          ...state.times,
          unselected: action.timestamp,
        },
      };

    default:
      return state;
  }
}
