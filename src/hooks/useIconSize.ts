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

export interface UseIconSizeProps {
  size?: number;
  scale?: IconScale;
  noSize?: boolean;
}

export type UseIconSizeResponse = UseIconSizeProps & {
  width: string;
  height: string;
};

export function useIconSize({
  size: initSize,
  scale: initScale,
  noSize = false,
  ...props
}: UseIconSizeProps): UseIconSizeResponse {
  const response: UseIconSizeResponse = { ...(props as UseIconSizeResponse) };

  const { size: contextSize, scale: contextScale } = useContext(ScaleContext);
  const size =
    initSize === 0
      ? 0
      : initSize || (initScale && scaleSize[initScale]) || contextSize || (contextScale && scaleSize[contextScale]);

  if (size !== undefined && !noSize) {
    response.height = typeof size === 'number' ? `${size}px` : size;
    response.width = typeof size === 'number' ? `${size}px` : size;
  }

  return response;
}
