import { createContext } from 'react';
import { Mutable } from '../../types';

export type SizeContextValue = Mutable<
  Partial<Pick<ClientRect, 'bottom' | 'height' | 'left' | 'right' | 'top' | 'width'>>
>;

export const SizeContext = createContext<SizeContextValue>({
  bottom: undefined,
  height: undefined,
  left: undefined,
  right: undefined,
  top: undefined,
  width: undefined,
});
