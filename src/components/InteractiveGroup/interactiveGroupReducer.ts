import { InteractiveGroupItemType } from './types';
import {
  interactiveGroupActions as ACTIONS,
  InteractiveGroupStateAction,
  InteractiveGroupEventTypes,
  InteractiveGroupStateActionUnsetSelected,
  InteractiveGroupStateActionSetSelected,
  InteractiveGroupStateActionSelectFocused,
} from './interactiveGroupActions';
import { interactiveGroupItemsFactory, InteractiveGroupItems } from './interactiveGroupItemsFactory';

export type InteractiveGroupState = {
  events: {
    cleared?: InteractiveGroupEventTypes['event'];
    focused?: InteractiveGroupEventTypes['event'];
    selected?: InteractiveGroupEventTypes['event'];
    unselected?: InteractiveGroupEventTypes['event'];
    triggered?: InteractiveGroupEventTypes['event'];
  };
  focusedIndex?: number;
  items: InteractiveGroupItems;
  selectedId?: string | string[];
  triggeredId?: string;
  times: {
    cleared?: number;
    focused?: number;
    selected?: number;
    triggered?: number;
    unselected?: number;
  };
};

export const getInteractiveGroupInitialState = ({
  initialItems = [],
  initialSelected,
}: {
  initialItems?: InteractiveGroupItemType[];
  initialSelected?: string | string[];
} = {}): InteractiveGroupState => {
  const items = interactiveGroupItemsFactory(initialItems);
  const selectedIndex = Array.isArray(initialSelected)
    ? items.getIndexByIds(initialSelected)
    : items.getIndexById(initialSelected);

  return {
    events: {},
    focusedIndex: (Array.isArray(selectedIndex) ? selectedIndex[0] : selectedIndex) || 0,
    items,
    selectedId: initialSelected,
    times: {},
  };
};

export function interactiveGroupReducer(
  state = getInteractiveGroupInitialState(),
  initAction: InteractiveGroupStateAction,
): InteractiveGroupState {
  let action = { ...initAction };

  const isIdSelected = (id: string): boolean =>
    Array.isArray(state.selectedId) ? state.selectedId.includes(id) : state.selectedId === id;

  // a helper to convert selected Ids between multi-select and single select
  const getSelectedIds = (): string | string[] | undefined => {
    if ('allowMultiSelect' in action && action.allowMultiSelect) {
      if (state.selectedId !== undefined) {
        if (Array.isArray(state.selectedId)) {
          return [...state.selectedId];
        }
        return [state.selectedId];
      }
      return [];
    }
    return Array.isArray(state.selectedId) ? state.selectedId.slice(-1) : state.selectedId;
  };

  const getSelectedIdsIncludingId = (id: string): string | string[] => {
    if ('allowMultiSelect' in action && action.allowMultiSelect) {
      const ids = getSelectedIds() || [];
      if (Array.isArray(ids) && !ids.includes(id)) ids.push(id);
      return ids;
    }
    return id;
  };

  const getSelectedIdsExcludingId = (id: string): string | string[] | undefined => {
    if ('allowMultiSelect' in action && action.allowMultiSelect) {
      const ids = getSelectedIds();
      if (Array.isArray(ids) && ids.includes(id)) return ids.filter(i => i !== id);
      return ids;
    }
    return undefined;
  };

  if (action.type === ACTIONS.TOGGLE_SELECTED) {
    if (isIdSelected(action.selectedId) && !action.allowReselect) {
      action = {
        ...action,
        type: ACTIONS.UNSET_SELECTED,
      } as InteractiveGroupStateActionUnsetSelected;
    } else {
      action = {
        ...action,
        type: ACTIONS.SET_SELECTED,
      } as InteractiveGroupStateActionSetSelected;
    }
  }

  if (action.type === ACTIONS.TOGGLE_SELECTED_FOCUSED && state.focusedIndex !== undefined) {
    const focusedId = (state.items.at(state.focusedIndex) || {}).id;
    if (isIdSelected(focusedId) && !action.allowReselect) {
      action = {
        ...action,
        type: ACTIONS.UNSET_SELECTED,
        selectedId: focusedId,
      } as InteractiveGroupStateActionUnsetSelected;
    } else {
      action = {
        ...action,
        type: ACTIONS.SELECT_FOCUSED,
      } as InteractiveGroupStateActionSelectFocused;
    }
  }

  const getIndexByActionType = (type: ACTIONS): number | undefined => {
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

  switch (action.type) {
    case ACTIONS.SET_ITEMS:
      return {
        ...state,
        items: interactiveGroupItemsFactory(action.items),
      };

    case ACTIONS.FOCUS_FIRST:
    case ACTIONS.FOCUS_LAST:
    case ACTIONS.FOCUS_NEXT:
    case ACTIONS.FOCUS_PREVIOUS: {
      const focusedIndex = getIndexByActionType(action.type);
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

    case ACTIONS.SELECT_FIRST:
    case ACTIONS.SELECT_LAST:
    case ACTIONS.SELECT_NEXT:
    case ACTIONS.SELECT_PREVIOUS: {
      const focusedIndex = getIndexByActionType(action.type);
      const item = focusedIndex !== undefined && state.items.at(focusedIndex);
      if (!item) return state;

      const isTriggerOnly = state.items.isItemTriggerOnly(item);
      return {
        ...state,
        focusedIndex,
        ...(isTriggerOnly && { triggeredId: item.id }),
        ...(!isTriggerOnly && { selectedId: getSelectedIdsIncludingId(item.id) }),
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

      const isTriggerOnly = state.items.isItemTriggerOnly(item);
      return {
        ...state,
        ...(isTriggerOnly && { triggeredId: item.id }),
        ...(!isTriggerOnly && { selectedId: getSelectedIdsIncludingId(item.id) }),
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

    case ACTIONS.SET_SELECTED: {
      if (isIdSelected(action.selectedId) && !action.allowReselect) return state;

      const focusedIndex = state.items.getIndexById(action.selectedId) as number | undefined;
      const isTriggerOnly = focusedIndex !== undefined && state.items.isItemTriggerOnly(state.items.at(focusedIndex));
      return {
        ...state,
        focusedIndex,
        ...(isTriggerOnly && { triggeredId: action.selectedId }),
        ...(!isTriggerOnly && { selectedId: getSelectedIdsIncludingId(action.selectedId) }),
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

    case ACTIONS.UNSET_SELECTED:
      if (action.disableUnselect) return state;

      return {
        ...state,
        selectedId: getSelectedIdsExcludingId(action.selectedId),
        events: {
          ...state.events,
          unselected: action.event,
        },
        times: {
          ...state.times,
          unselected: action.timestamp,
        },
      };

    case ACTIONS.CLEAR:
      return {
        ...state,
        focusedIndex: undefined,
        selectedId: undefined,
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

    case ACTIONS.RESET:
      return {
        ...getInteractiveGroupInitialState(),
      };

    default:
      return state;
  }
}
