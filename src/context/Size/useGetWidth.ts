import { useContext } from 'react';
import { SizeContext, SizeContextValue } from './SizeContext';

/**
 * Returns only the width value from the context.
 */
export const useGetWidth = () => {
  const { width } = useContext<SizeContextValue>(SizeContext);
  return width;
};
