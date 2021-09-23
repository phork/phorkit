import { ToastWithContextItemType } from './ToastFromContext';

export enum toastActions {
  SET = 'SET',
  DELETE = 'DELETE',
  CLEAR = 'CLEAR',
  PIN = 'PIN',
}

export type ToastStateActionSet = {
  type: toastActions.SET;
  id: string;
  value: ToastWithContextItemType;
};

export type ToastStateActionDelete = {
  type: toastActions.DELETE;
  id: string;
};

export type ToastStateActionClear = {
  type: toastActions.CLEAR;
};

export type ToastStateActionPin = {
  type: toastActions.PIN;
  id: string;
};

export type ToastStateAction =
  | ToastStateActionSet
  | ToastStateActionDelete
  | ToastStateActionPin
  | ToastStateActionClear;
