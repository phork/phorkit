import { useContext } from 'react';
import {
  InteractiveGroupSelectedIdsContext,
  InteractiveGroupSelectedIdsContextValue,
} from './InteractiveGroupSelectedIdsContext';

/**
 * Returns the selected IDs and the function to check
 * if an ID is selected.
 */
export function useInteractiveGroupSelectedIds(): InteractiveGroupSelectedIdsContextValue {
  return useContext(InteractiveGroupSelectedIdsContext);
}
