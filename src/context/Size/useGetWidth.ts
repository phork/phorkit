import { useContext } from 'react';
import { SizeContext, SizeContextValue } from './SizeContext';

export const useGetWidth = () => {
  const { width } = useContext<SizeContextValue>(SizeContext);
  return width;
};
