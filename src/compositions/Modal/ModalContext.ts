/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { ModalWithContextItemType } from './ModalFromContext';

export type ModalContextValue = {
  /** The top modal on the stack (ie. the one that should be visible) */
  modal?: ModalWithContextItemType;
  /** A map of all the modals */
  modals: Map<string, ModalWithContextItemType>;
  /** Removes all the modals */
  clearModals: () => void;
  /** Creates a new modal, or if a modal with that contextId exists it jumps it to the top of the stack */
  createModal: (modal: ModalWithContextItemType, noJump?: boolean) => string | undefined;
  /** Removes the top modal from the stack and discards it */
  popModal: (force?: boolean) => void;
  /** Finds a modal by contextId and jumps it to the top of the stack */
  jumpModal: (id: string) => void;
  /** Removes a modal by contextId */
  removeModal: (id: string) => void;
  /** Check if a modal exists by its contextId */
  hasModal: (id: string) => boolean;
};

export const ModalContext = createContext<ModalContextValue>({
  modal: undefined,
  modals: new Map(),
  clearModals: () => {},
  createModal: (/* modal, noJump */) => undefined,
  popModal: (/* force */) => {},
  jumpModal: (/* id */) => {},
  removeModal: (/* id */) => {},
  hasModal: (/* id */) => false,
});
