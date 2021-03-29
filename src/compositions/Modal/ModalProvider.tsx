import produce from 'immer';
import React, { useCallback, useRef, useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import { ModalContext, ModalContextValue } from './ModalContext';
import { modalActions as ACTIONS } from './modalActions';
import { modalReducer as reducer, ModalState } from './modalReducer';

export interface ModalProviderProps {
  children: React.ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps): React.ReactElement {
  const previousValue = useRef<ModalContextValue>({} as ModalContextValue);
  const [state, dispatch] = useReducer(reducer, new Map() as ModalState);

  const removeModal = useCallback<ModalContextValue['removeModal']>(id => {
    dispatch({
      id,
      type: ACTIONS.DELETE,
    });
  }, []);

  const popModal = useCallback<ModalContextValue['popModal']>(force => {
    dispatch({
      type: ACTIONS.POP,
      force,
    });
  }, []);

  const createModal = useCallback<ModalContextValue['createModal']>((modal, options, noJump) => {
    const { id = uuid() } = modal.props;
    dispatch({
      id,
      type: noJump ? ACTIONS.SET : ACTIONS.JUMPSET,
      value: {
        modal: React.cloneElement(modal, {
          id,
        }),
        options,
      },
    });
  }, []);

  const jumpModal = useCallback<ModalContextValue['jumpModal']>(id => {
    dispatch({
      id,
      type: ACTIONS.JUMP,
    });
  }, []);

  const clearModals = useCallback<ModalContextValue['clearModals']>(() => {
    dispatch({
      type: ACTIONS.CLEAR,
    });
  }, []);

  const hasModal = useCallback<ModalContextValue['hasModal']>(
    id => {
      return state.has(id);
    },
    [state],
  );

  // only ever show the latest modal in the stack
  const { modal } = (state.size && Array.from(state.values()).pop()) || {};

  const value = produce(previousValue.current, draftState => {
    draftState.modal = modal;
    draftState.modals = state;
    draftState.clearModals = clearModals;
    draftState.createModal = createModal;
    draftState.jumpModal = jumpModal;
    draftState.popModal = popModal;
    draftState.removeModal = removeModal;
    draftState.hasModal = hasModal;
  });
  previousValue.current = value;

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
