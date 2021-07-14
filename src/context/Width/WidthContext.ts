import { createContext } from 'react';

export interface WidthContextValue<E extends HTMLElement = HTMLDivElement> {
  width: number | undefined;
  ref: React.RefCallback<E>;
}

export const WidthContext = createContext<WidthContextValue<any>>({
  width: undefined,
  ref: () => {},
});
