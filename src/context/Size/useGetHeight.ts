import { useContext } from 'react';
import { SizeContext, SizeContextValue } from './SizeContext';

export const useGetHeight = () => {
  const { height } = useContext<SizeContextValue>(SizeContext);
  return height;
};
