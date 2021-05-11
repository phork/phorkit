import { modalActions as ACTIONS, ModalStateAction } from './modalActions';
import { ModalItemType } from './types';

export type ModalState = Map<string, ModalItemType>;

const handleDelete = (modal: ModalItemType | undefined) => {
  modal?.options?.onClose?.();
};

export function modalReducer(state: ModalState, action: ModalStateAction) {
  const mutable: ModalState = new Map(state);

  switch (action.type) {
    case ACTIONS.SET:
      if (!mutable.has(action.id)) {
        mutable.set(action.id, action.value);
        return mutable;
      }
      return state;

    // jumps a modal to the front of the screen
    case ACTIONS.JUMP: {
      const modal = mutable.get(action.id);
      if (modal) {
        mutable.delete(action.id);
        mutable.set(action.id, modal);
        return mutable;
      }
      return state;
    }

    // create a modal if it doesn't exist or jump it to the front if it does
    case ACTIONS.JUMPSET: {
      const modal = mutable.get(action.id);
      if (!modal) {
        mutable.set(action.id, action.value);
        return mutable;
      }
      mutable.delete(action.id);
      mutable.set(action.id, modal);
      return mutable;
    }

    case ACTIONS.DELETE:
      const modal = mutable.get(action.id);
      if (modal) {
        handleDelete(modal);
        mutable.delete(action.id);
        return mutable;
      }
      return state;

    case ACTIONS.CLEAR:
      if (mutable.size) {
        Array.from(mutable.values())
          .reverse()
          .forEach(modal => handleDelete(modal));
        mutable.clear();
        return mutable;
      }
      return state;

    case ACTIONS.POP: {
      const { modal } = Array.from(mutable.values()).pop() || {};
      if (modal && (action.force || !modal.props.permanent)) {
        handleDelete(mutable.get(modal.props.id));
        mutable.delete(modal.props.id);
        return mutable;
      }
      return state;
    }

    default:
      return state;
  }
}
