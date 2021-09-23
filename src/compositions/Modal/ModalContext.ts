import { createContext } from 'react';
import { ModalWithContextItemType } from './ModalFromContext';

export interface ModalContextValue {
  modal?: ModalWithContextItemType;
  modals: Map<string, ModalWithContextItemType>;
  clearModals: () => void;
  createModal: (modal: ModalWithContextItemType, noJump?: boolean) => string | undefined;
  popModal: (force?: boolean) => void;
  jumpModal: (id: string) => void;
  removeModal: (id: string) => void;
  hasModal: (id: string) => boolean;
}

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
