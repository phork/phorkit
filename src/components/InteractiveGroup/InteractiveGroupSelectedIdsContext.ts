/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { InteractiveGroupItemId } from './types';

export type InteractiveGroupSelectedIdsContextValue<T extends InteractiveGroupItemId = string> = {
  isSelected: (id: T) => boolean;
  selectedIds: readonly T[] | undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const InteractiveGroupSelectedIdsContext = createContext<InteractiveGroupSelectedIdsContextValue<any>>({
  isSelected: () => false,
  selectedIds: undefined,
});
