import { listRegistryActions as ACTIONS, ListRegistryStateAction } from './listRegistryActions';
import { ListRegistryState } from './types';

export function listRegistryReducer<E extends HTMLElement = HTMLElement>(
  state: ListRegistryState<E>,
  action: ListRegistryStateAction<E>,
): ListRegistryState<E> {
  const mutable: ListRegistryState<E> = new Map(state);

  switch (action.type) {
    case ACTIONS.REGISTER:
      mutable.set(action.id, action.ref);
      return mutable;

    case ACTIONS.UNREGISTER:
      if (mutable.has(action.id)) {
        mutable.delete(action.id);
        return mutable;
      }
      return state;

    case ACTIONS.CLEAR:
      if (mutable.size) {
        mutable.clear();
        return mutable;
      }
      return state;

    default:
      return state;
  }
}
