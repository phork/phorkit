/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export type InteractiveGroupFocusedIndexContextValue = number | undefined;

export const InteractiveGroupFocusedIndexContext = createContext<InteractiveGroupFocusedIndexContextValue>(undefined);
