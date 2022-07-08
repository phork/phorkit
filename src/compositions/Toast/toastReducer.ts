import React from 'react';
import { ToastWithContextItemType } from './ToastFromContext';
import { toastActions as ACTIONS, ToastStateAction } from './toastActions';

export type ToastState = Map<string, ToastWithContextItemType>;

const handleDelete = (toast: ToastWithContextItemType | undefined) => {
  toast && toast.props.onClose?.(undefined, toast.props.contextId);
};

export function toastReducer(state: ToastState, action: ToastStateAction): ToastState {
  const mutable = new Map(state);

  switch (action.type) {
    case ACTIONS.SET:
      mutable.set(action.id, action.value);
      return mutable;

    case ACTIONS.DELETE: {
      const toast = mutable.get(action.id);
      if (toast) {
        handleDelete(toast);
        mutable.delete(action.id);
        return mutable;
      }
      return state;
    }

    case ACTIONS.CLEAR:
      if (mutable.size) {
        Array.from(mutable.values())
          .reverse()
          .forEach(toast => handleDelete(toast));
        mutable.clear();
        return mutable;
      }
      return state;

    case ACTIONS.PIN:
      if (mutable.has(action.id)) {
        mutable.set(action.id, React.cloneElement(mutable.get(action.id) as ToastWithContextItemType, { duration: 0 }));
        return mutable;
      }
      return state;

    default:
      return state;
  }
}
