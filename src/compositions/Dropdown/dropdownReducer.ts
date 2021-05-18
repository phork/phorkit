import { dropdownActions as ACTIONS, DropdownStateAction } from './dropdownActions';

export type DropdownState = {
  busy?: boolean;
  id: string;
  input?: string;
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

    case ACTIONS.SET_FILTER:
      return {
        ...state,
        input: action.input,
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

    default:
      return state;
  }
}
