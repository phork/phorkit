import { createContext } from 'react';

export interface SizeContextValue {
  height?: number;
  width?: number;
}

export const SizeContext = createContext<SizeContextValue>({
  height: undefined,
  width: undefined,
});
