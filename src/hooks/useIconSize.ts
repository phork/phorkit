import { useContext } from 'react';
import { IconScale } from '../types';
import { ScaleContext } from '../context/Scale/ScaleContext';

const scaleSize = {
  xsmall: 8,
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  '2xlarge': 32,
  '3xlarge': 40,
};

export interface UseIconSizeInterface {
  size?: number;
  scale?: IconScale;
  noSize?: boolean;
}

export type UseIconSizeResponse = UseIconSizeInterface & {
  width: string;
  height: string;
};

export function useIconSize({
  size: initSize,
  scale: initScale,
  noSize = false,
  ...props
}: UseIconSizeInterface): UseIconSizeResponse {
  const { size: contextSize, scale: contextScale } = useContext(ScaleContext);
  const size =
    initSize || (initScale && scaleSize[initScale]) || contextSize || (contextScale && scaleSize[contextScale]);
  const response: UseIconSizeResponse = props as UseIconSizeResponse;

  if (size && !noSize) {
    response.height = typeof size === 'number' ? `${size}px` : size;
    response.width = typeof size === 'number' ? `${size}px` : size;
  }

  return response;
}
