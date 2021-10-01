import { createContext } from 'react';
import { EventListenerState } from './eventListenerReducer';
import { AddEventListenerCallback, RemoveEventListenerCallback } from './types';

export type EventListenerContextValue = {
  /** A map of all the events by listener type (eg. click, keydown) */
  events: EventListenerState;
  /** Adds an event listener to the front of the queue */
  unshiftEventListener: AddEventListenerCallback;
  /** Adds an event listener to the back of the queue */
  pushEventListener: AddEventListenerCallback;
  /** Removes an event listener by ID */
  removeEventListener: RemoveEventListenerCallback;
  /** Removes all event listeners */
  clearListeners: () => void;
};

export const EventListenerContext = createContext<EventListenerContextValue>({
  events: new Map() as EventListenerState,
  unshiftEventListener: (/* eventType, listener, options */) => undefined,
  pushEventListener: (/* eventType, listener, options */) => undefined,
  removeEventListener: (/* id, eventType, options */) => {},
  clearListeners: () => {},
});
