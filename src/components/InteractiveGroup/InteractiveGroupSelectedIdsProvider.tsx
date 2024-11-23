import React, { useMemo } from 'react';
import {
  InteractiveGroupSelectedIdsContext,
  InteractiveGroupSelectedIdsContextValue,
} from './InteractiveGroupSelectedIdsContext';
import { InteractiveGroupItemId } from './types';

export type InteractiveGroupSelectedIdsProviderProps<T extends InteractiveGroupItemId = string> =
  InteractiveGroupSelectedIdsContextValue<T> & {
    children: React.ReactElement;
  };

/**
 * The focusedIndex has been split out from the PartialInteractiveGroupProvider
 * to prevent unnecessary re-renders.
 */
export function InteractiveGroupSelectedIdsProvider<T extends InteractiveGroupItemId = string>({
  children,
  selectedIds,
  isSelected,
}: InteractiveGroupSelectedIdsProviderProps<T>): JSX.Element {
  return (
    <InteractiveGroupSelectedIdsContext.Provider
      value={useMemo(() => ({ selectedIds, isSelected }), [isSelected, selectedIds])}
    >
      {children}
    </InteractiveGroupSelectedIdsContext.Provider>
  );
}

InteractiveGroupSelectedIdsProvider.displayName = 'InteractiveGroupSelectedIdsProvider';
