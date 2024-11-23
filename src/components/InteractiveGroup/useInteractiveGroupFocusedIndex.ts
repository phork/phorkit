import { useContext } from 'react';
import {
  InteractiveGroupFocusedIndexContext,
  InteractiveGroupFocusedIndexContextValue,
} from './InteractiveGroupFocusedIndexContext';

/**
 * Returns the focusedIndex number or undefined.
 */
export function useInteractiveGroupFocusedIndex(): InteractiveGroupFocusedIndexContextValue {
  return useContext(InteractiveGroupFocusedIndexContext);
}
