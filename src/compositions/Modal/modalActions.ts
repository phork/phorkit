import { ModalWithContextItemType } from './ModalFromContext';

export enum modalActions {
  SET = 'SET',
  JUMP = 'JUMP',
  JUMPSET = 'JUMPSET',
  DELETE = 'DELETE',
  CLEAR = 'CLEAR',
  POP = 'POP',
}

export type ModalStateActionSet = {
  type: modalActions.SET;
  id: string;
  value: ModalWithContextItemType;
};

export type ModalStateActionJump = {
  type: modalActions.JUMP;
  id: string;
};

export type ModalStateActionJumpSet = {
  type: modalActions.JUMPSET;
  id: string;
  value: ModalWithContextItemType;
};

export type ModalStateActionDelete = {
  type: modalActions.DELETE;
  id: string;
};

export type ModalStateActionClear = {
  type: modalActions.CLEAR;
};

export type ModalStateActionPop = {
  type: modalActions.POP;
  force?: boolean;
};

export type ModalStateAction =
  | ModalStateActionSet
  | ModalStateActionJump
  | ModalStateActionJumpSet
  | ModalStateActionDelete
  | ModalStateActionClear
  | ModalStateActionPop;
