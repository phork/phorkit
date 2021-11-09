import produce, { castDraft } from 'immer';
import { nanoid } from 'nanoid';
import React, { useCallback, useRef, useReducer } from 'react';
import { ModalContext, ModalContextValue } from './ModalContext';
import { modalActions as ACTIONS } from './modalActions';
import { modalReducer as reducer, ModalState } from './modalReducer';

export type ModalProviderProps = {
  children: React.ReactNode;
};

/**
 * The modal provider tracks a collection of modals
 * and provides functions to create a modal, remove a
 * modal, move a modal to the top of the stack and
 * clear all modals. It also provides a map containing
 * all the modals as well as the currently active modal.
 *
 * Because only one modal can be rendered at a time
 * the top modal in the stack is the one shown.
 */
export function ModalProvider({ children }: ModalProviderProps): JSX.Element {
  const previousValue = useRef<ModalContextValue>({} as ModalContextValue);
  const [state, dispatch] = useReducer(reducer, new Map() as ModalState);

  const clearModals = useCallback<ModalContextValue['clearModals']>(() => {
    dispatch({
      type: ACTIONS.CLEAR,
    });
  }, []);

  const createModal = useCallback<ModalContextValue['createModal']>((modal, noJump) => {
    const { contextId = nanoid() } = modal.props;
    dispatch({
      id: contextId,
      type: noJump ? ACTIONS.SET : ACTIONS.JUMPSET,
      value: React.cloneElement(modal, {
        contextId,
      }),
    });
    return contextId;
  }, []);

  const hasModal = useCallback<ModalContextValue['hasModal']>(
    id => {
      return state.has(id);
    },
    [state],
  );

  const jumpModal = useCallback<ModalContextValue['jumpModal']>(id => {
    dispatch({
      id,
      type: ACTIONS.JUMP,
    });
  }, []);

  const popModal = useCallback<ModalContextValue['popModal']>(force => {
    dispatch({
      type: ACTIONS.POP,
      force,
    });
  }, []);

  const removeModal = useCallback<ModalContextValue['removeModal']>(id => {
    dispatch({
      id,
      type: ACTIONS.DELETE,
    });
  }, []);

  // only ever show the latest modal in the stack
  const modal = state.size ? Array.from(state.values()).pop() : undefined;

  const value = produce(previousValue.current, draftState => {
    draftState.modal = modal;
    draftState.modals = castDraft(state);
    draftState.clearModals = clearModals;
    draftState.createModal = createModal;
    draftState.hasModal = hasModal;
    draftState.jumpModal = jumpModal;
    draftState.popModal = popModal;
    draftState.removeModal = removeModal;
  });
  previousValue.current = value;

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

ModalProvider.displayName = 'ModalProvider';
