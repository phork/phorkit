/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export type DeepFocusContextValue = boolean | undefined;

export const DeepFocusContext = createContext<DeepFocusContextValue>(undefined);
