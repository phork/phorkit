import { useContext } from 'react';
import { SizeContext, SizeContextValue } from './SizeContext';

export const useSize = () => {
  return useContext<SizeContextValue>(SizeContext);
};
