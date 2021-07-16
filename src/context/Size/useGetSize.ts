import { useContext } from 'react';
import { SizeContext, SizeContextValue } from './SizeContext';

export const useGetSize = () => {
  return useContext<SizeContextValue>(SizeContext);
};
