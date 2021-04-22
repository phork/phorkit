import { createContext } from 'react';

export type FocusType = 'keyboard' | 'mouse' | 'touch';

export interface AccessibilityContextValue {
  accessible?: boolean;
  focusType?: FocusType;
  setFocusType: (focusType: FocusType) => void;
}

export const AccessibilityContext = createContext<AccessibilityContextValue>({
  accessible: undefined,
  focusType: undefined,
  setFocusType: (/* focusType */) => {},
});