import { useContext } from 'react';
import { SizeContext, SizeContextValue } from './SizeContext';

export const useHeight = () => {
  const { height } = useContext<SizeContextValue>(SizeContext);
  return height;
};
