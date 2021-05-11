import { createContext } from 'react';
import { EventListenerState } from './eventListenerReducer';
import { AddEventListenerCallback, RemoveEventListenerCallback } from './types';

export interface EventListenerContextValue {
  events: EventListenerState;
  unshiftEventListener: AddEventListenerCallback;
  pushEventListener: AddEventListenerCallback;
  removeEventListener: RemoveEventListenerCallback;
  clearListeners: () => void;
}

export const EventListenerContext = createContext<EventListenerContextValue>({
  events: new Map() as EventListenerState,
  unshiftEventListener: (/* eventType, listener, options */) => undefined,
  pushEventListener: (/* eventType, listener, options */) => undefined,
  removeEventListener: (/* id, eventType, options */) => {},
  clearListeners: () => {},
});
