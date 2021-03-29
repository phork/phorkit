import { useContext } from 'react';
import { AccessibilityContext } from './AccessibilityContext';

export const useAccessibility = () => {
  const { accessible } = useContext(AccessibilityContext);
  return accessible;
};
