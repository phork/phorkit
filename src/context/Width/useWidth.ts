import { useContext } from 'react';
import { WidthContext, WidthContextValue } from './WidthContext';

export const useWidth = <E extends HTMLElement = HTMLDivElement>() => {
  const { width } = useContext<WidthContextValue<E>>(WidthContext);
  return width;
};
