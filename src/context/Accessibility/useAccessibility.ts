import { useContext } from 'react';
import { AccessibilityContext } from './AccessibilityContext';

/**
 * This returns true if the event type used for navigation
 * was from the keyboard. When a component consumes this
 * value it can add custom styles to show borders or other
 * accessibility-friendly features that don't need to be
 * visible when navigating by mouse or touch.
 */
export const useAccessibility = (): boolean | undefined => {
  const { accessible } = useContext(AccessibilityContext);
  return accessible;
};
