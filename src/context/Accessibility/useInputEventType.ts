import { useContext } from 'react';
import { AccessibilityContext, EventType } from './AccessibilityContext';

/**
 * This returns the event type used for navigation.
 */
export const useInputEventType = (): EventType | undefined => {
  const { eventType } = useContext(AccessibilityContext);
  return eventType;
};
