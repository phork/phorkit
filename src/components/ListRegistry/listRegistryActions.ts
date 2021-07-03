import { ListRegistryItemType } from './types';

export enum listRegistryActions {
  CLEAR = 'CLEAR',
  REGISTER = 'REGISTER',
  UNREGISTER = 'UNREGISTER',
}

export type ListRegistryStateActionRegister<E extends HTMLElement = HTMLElement> = {
  type: listRegistryActions.REGISTER;
  id: string;
  ref: ListRegistryItemType<E>;
};

export type ListRegistryStateActionUnregister = {
  type: listRegistryActions.UNREGISTER;
  id: string;
};

export type ListRegistryStateActionClear = {
  type: listRegistryActions.CLEAR;
};

export type ListRegistryStateAction<E extends HTMLElement = HTMLElement> =
  | ListRegistryStateActionRegister<E>
  | ListRegistryStateActionUnregister
  | ListRegistryStateActionClear;
