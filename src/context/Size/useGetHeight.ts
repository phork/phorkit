import { useContext } from 'react';
import { SizeContext, SizeContextValue } from './SizeContext';

/**
 * Returns only the height value from the context.
 */
export const useGetHeight = () => {
  const { height } = useContext<SizeContextValue>(SizeContext);
  return height;
};
