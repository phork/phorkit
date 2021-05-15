import { dropdownActions as ACTIONS, DropdownStateAction } from './dropdownActions';
import { DropdownOption } from './types';

export type DropdownState = {
  busy?: boolean;
  clearFocus?: boolean;
  id: string;
  input?: string;
  inputFocus?: boolean;
  listFocus?: boolean;
  listVisible?: boolean;
  options?: DropdownOption[];
  selected?: DropdownOption | DropdownOption[];
};

export function dropdownReducer(state: DropdownState, action: DropdownStateAction): DropdownState {
  switch (action.type) {
    case ACTIONS.CLEAR_FILTER:
      return {
        ...state,
        input: '',
        options: undefined,
      };

    case ACTIONS.HIDE_DROPDOWN:
      return {
        ...state,
        listVisible: false,
      };

    case ACTIONS.SET_BUSY:
      return {
        ...state,
        busy: true,
      };

    case ACTIONS.SET_CLEAR_FOCUS:
      return {
        ...state,
        clearFocus: true,
      };

    case ACTIONS.SET_FILTER:
      return {
        ...state,
        input: action.input,
      };

    case ACTIONS.SET_INPUT_FOCUS:
      return {
        ...state,
        inputFocus: true,
      };

    case ACTIONS.SET_LIST_FOCUS:
      return {
        ...state,
        listFocus: true,
      };

    case ACTIONS.SET_OPTIONS:
      return {
        ...state,
        busy: false,
        options: action.options,
      };

    case ACTIONS.SET_SELECTED:
      return {
        ...state,
        selected: action.selected,
      };

    case ACTIONS.SET_SELECTED_AND_HIDE_DROPDOWN:
      return {
        ...state,
        selected: action.selected,
        listVisible: false,
      };

    case ACTIONS.SHOW_DROPDOWN:
      return {
        ...state,
        listVisible: true,
      };

    case ACTIONS.TOGGLE_DROPDOWN:
      return {
        ...state,
        listVisible: !state.listVisible,
      };

    case ACTIONS.UNSET_SELECTED:
      return {
        ...state,
        selected: undefined,
      };

    case ACTIONS.UNSET_CLEAR_FOCUS:
      return {
        ...state,
        clearFocus: false,
      };

    case ACTIONS.UNSET_INPUT_FOCUS:
      return {
        ...state,
        inputFocus: false,
      };

    case ACTIONS.UNSET_LIST_FOCUS:
      return {
        ...state,
        listFocus: false,
      };

    default:
      return state;
  }
}
