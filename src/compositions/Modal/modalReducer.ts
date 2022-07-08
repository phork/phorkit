import { ModalWithContextItemType } from './ModalFromContext';
import { modalActions as ACTIONS, ModalStateAction } from './modalActions';

export type ModalState = Map<string, ModalWithContextItemType>;

const handleDelete = (modal: ModalWithContextItemType | undefined) => {
  modal && modal.props.onClose?.(undefined, modal.props.contextId);
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

    // adds a modal to the top of the queue, effectively showing it
    case ACTIONS.JUMP: {
      const modal = mutable.get(action.id);
      if (modal) {
        mutable.delete(action.id);
        mutable.set(action.id, modal);
        return mutable;
      }
      return state;
    }

    // creates a modal if it doesn't exist or jumps it to the top of the stack if it does
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

    case ACTIONS.DELETE: {
      const modal = mutable.get(action.id);
      if (modal) {
        handleDelete(modal);
        mutable.delete(action.id);
        return mutable;
      }
      return state;
    }

    case ACTIONS.CLEAR:
      if (mutable.size) {
        Array.from(mutable.values())
          .reverse()
          .forEach(modal => handleDelete(modal));
        mutable.clear();
        return mutable;
      }
      return state;

    // removes the top modal from the stack, effectively showing the next one, or none
    case ACTIONS.POP: {
      const modal = Array.from(mutable.values()).pop();
      if (modal && (action.force || !modal.props.permanent)) {
        handleDelete(mutable.get(modal.props.contextId));
        mutable.delete(modal.props.contextId);
        return mutable;
      }
      return state;
    }

    default:
      return state;
  }
}
