import { createContext } from 'react';
import { Mutable } from '../../types';

export type SizeContextValue = Mutable<
  Partial<Pick<DOMRect, 'bottom' | 'height' | 'left' | 'right' | 'top' | 'width'>>
>;

export const SizeContext = createContext<SizeContextValue>({
  bottom: undefined,
  height: undefined,
  left: undefined,
  right: undefined,
  top: undefined,
  width: undefined,
});

export type SizeContextType = keyof SizeContextValue;
