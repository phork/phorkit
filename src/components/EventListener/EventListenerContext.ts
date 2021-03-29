import React from 'react';
import { AddEventListenerCallback, RemoveEventListenerCallback } from './types';
import { EventListenerState } from './eventListenerReducer';

export interface EventListenerContextValue {
  events: EventListenerState;
  unshiftEventListener: AddEventListenerCallback;
  pushEventListener: AddEventListenerCallback;
  removeEventListener: RemoveEventListenerCallback;
  clearListeners: () => void;
}

export const EventListenerContext = React.createContext<EventListenerContextValue>({
  events: new Map() as EventListenerState,
  unshiftEventListener: (/* eventType, listener, options */) => undefined,
  pushEventListener: (/* eventType, listener, options */) => undefined,
  removeEventListener: (/* id, eventType, options */) => {},
  clearListeners: () => {},
});
