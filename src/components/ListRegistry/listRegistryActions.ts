import { ListRegistryItemType } from './types';

export enum listRegistryActions {
  CLEAR = 'CLEAR',
  REGISTER = 'REGISTER',
  UNREGISTER = 'UNREGISTER',
}

export type ListRegistryStateActionRegister = {
  type: listRegistryActions.REGISTER;
  id: string;
  element: ListRegistryItemType;
};

export type ListRegistryStateActionUnregister = {
  type: listRegistryActions.UNREGISTER;
  id: string;
};

export type ListRegistryStateActionClear = {
  type: listRegistryActions.CLEAR;
};

export type ListRegistryStateAction =
  | ListRegistryStateActionRegister
  | ListRegistryStateActionUnregister
  | ListRegistryStateActionClear;
