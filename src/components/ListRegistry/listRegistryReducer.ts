import { listRegistryActions as ACTIONS, ListRegistryStateAction } from './listRegistryActions';
import { ListRegistryItemType } from './types';

export type ListRegistryState = Map<string, ListRegistryItemType>;

export function listRegistryReducer(state: ListRegistryState, action: ListRegistryStateAction): ListRegistryState {
  const mutable: ListRegistryState = new Map(state);

  switch (action.type) {
    case ACTIONS.REGISTER:
      mutable.set(action.id, action.element);
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
