import { useContext } from 'react';
import { SizeContext, SizeContextValue } from './SizeContext';

export const useWidth = () => {
  const { width } = useContext<SizeContextValue>(SizeContext);
  return width;
};
