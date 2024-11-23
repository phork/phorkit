import React from 'react';
import {
  InteractiveGroupFocusedIndexContext,
  InteractiveGroupFocusedIndexContextValue,
} from './InteractiveGroupFocusedIndexContext';

export type InteractiveGroupFocusedIndexProviderProps = {
  children: React.ReactElement;
  focusedIndex: InteractiveGroupFocusedIndexContextValue;
};

/**
 * The focusedIndex has been split out from the PartialInteractiveGroupProvider
 * to prevent unnecessary re-renders.
 */
export function InteractiveGroupFocusedIndexProvider({
  children,
  focusedIndex,
}: InteractiveGroupFocusedIndexProviderProps): JSX.Element {
  return (
    <InteractiveGroupFocusedIndexContext.Provider value={focusedIndex}>
      {children}
    </InteractiveGroupFocusedIndexContext.Provider>
  );
}

InteractiveGroupFocusedIndexProvider.displayName = 'InteractiveGroupFocusedIndexProvider';
