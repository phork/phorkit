import { useContext } from 'react';
import { DeepFocusContext, DeepFocusContextValue } from './DeepFocusContext';

/**
 * Returns the focus set and function for updating it.
 */
export function useIsDeepFocused(): DeepFocusContextValue {
  return useContext(DeepFocusContext);
}
