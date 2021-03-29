import { EventListenerItemType } from './types';

export enum eventListenerActions {
  UNSHIFT = 'UNSHIFT',
  PUSH = 'PUSH',
  REMOVE = 'REMOVE',
  CLEAR = 'CLEAR',
}

export type EventListenerStateActionUnshift = EventListenerItemType & {
  type: eventListenerActions.UNSHIFT;
};

export type EventListenerStateActionPush = EventListenerItemType & {
  type: eventListenerActions.PUSH;
};

export type EventListenerStateActionRemove = Omit<EventListenerItemType, 'listener'> & {
  type: eventListenerActions.REMOVE;
};

export type EventListenerStateActionClear = {
  type: eventListenerActions.CLEAR;
};

export type EventListenerStateAction =
  | EventListenerStateActionUnshift
  | EventListenerStateActionPush
  | EventListenerStateActionRemove
  | EventListenerStateActionClear;
