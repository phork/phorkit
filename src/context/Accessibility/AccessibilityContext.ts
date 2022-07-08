/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export type EventType = 'keyboard' | 'mouse' | 'touch';

export type AccessibilityContextValue = {
  /** If the latest navigation event was by keyboard this is true */
  accessible?: boolean;
  /** The source of the latest navigation event */
  eventType?: EventType;
  /** Sets the value that's used to determine accessible flag */
  setEventType: (eventType: EventType) => void;
};

export const AccessibilityContext = createContext<AccessibilityContextValue>({
  accessible: false,
  eventType: undefined,
  setEventType: (/* eventType */) => {},
});
