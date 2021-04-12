import React from 'react';
import { ModalItemType } from './types';

export interface ModalContextValue {
  modal?: ModalItemType['modal'];
  modals: Map<string, ModalItemType>;
  clearModals: () => void;
  createModal: (
    modal: ModalItemType['modal'],
    options?: ModalItemType['options'],
    noJump?: boolean,
  ) => string | undefined;
  popModal: (force?: boolean) => void;
  jumpModal: (id: string) => void;
  removeModal: (id: string) => void;
  hasModal: (id: string) => boolean;
}

export const ModalContext = React.createContext<ModalContextValue>({
  modal: undefined,
  modals: new Map(),
  clearModals: () => {},
  createModal: (/* modal, options, noJump */) => undefined,
  popModal: (/* force */) => {},
  jumpModal: (/* id */) => {},
  removeModal: (/* id */) => {},
  hasModal: (/* id */) => false,
});
