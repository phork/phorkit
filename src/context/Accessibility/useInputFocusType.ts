import { useContext } from 'react';
import { AccessibilityContext, FocusType } from './AccessibilityContext';

export const useInputFocusType = (): FocusType | undefined => {
  const { focusType } = useContext(AccessibilityContext);
  return focusType;
};
