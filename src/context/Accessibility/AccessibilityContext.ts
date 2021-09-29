import { createContext } from 'react';

export type FocusType = 'keyboard' | 'mouse' | 'touch';

export interface AccessibilityContextValue {
  /** If the latest navigation event was by keyboard this is true */
  accessible?: boolean;
  /** The source of the latest navigation event */
  focusType?: FocusType;
  /** Sets the value that's used to determine accessible flag */
  setFocusType: (focusType: FocusType) => void;
}

export const AccessibilityContext = createContext<AccessibilityContextValue>({
  accessible: false,
  focusType: undefined,
  setFocusType: (/* focusType */) => {},
});
