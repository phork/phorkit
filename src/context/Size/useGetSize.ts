import { useContext } from 'react';
import { SizeContext, SizeContextValue } from './SizeContext';

/**
 * Returns the size value from the context.
 */
export const useGetSize = () => {
  return useContext<SizeContextValue>(SizeContext);
};
