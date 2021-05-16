import { dropdownActions as ACTIONS, DropdownStateAction } from './dropdownActions';

export type DropdownState = {
  busy?: boolean;
  clearFocus?: boolean;
  id: string;
  input?: string;
  inputFocus?: boolean;
  listFocus?: boolean;
  listVisible?: boolean;
};

export function dropdownReducer(state: DropdownState, action: DropdownStateAction): DropdownState {
  switch (action.type) {
    case ACTIONS.CLEAR_FILTER:
      return {
        ...state,
        input: '',
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

    case ACTIONS.UNSET_BUSY:
      return {
        ...state,
        busy: false,
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
