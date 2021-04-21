import { useContext } from 'react';
import { AccessibilityContext } from './AccessibilityContext';

export const useAccessibility = (): boolean | undefined => {
  const { accessible } = useContext(AccessibilityContext);
  return accessible;
};
