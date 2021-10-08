import { useContext } from 'react';
import { IconScale } from '../types';
import { ScaleContext } from '../context/Scale/ScaleContext';

const scaleSize: Record<IconScale, number> = {
  xsmall: 8,
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  '2xlarge': 32,
  '3xlarge': 40,
};

export type UseIconSizeProps = {
  /** An exact icon size using either a number for pixels or a string */
  size?: number | string;
  /** A scale (eg. xsmall, small, medium, etc.) */
  scale?: IconScale;
  /** Don't return any size props */
  noSize?: boolean;
};

export type UseIconSizeResponse = UseIconSizeProps & {
  width: string;
  height: string;
};

/**
 * Returns `width` and `height` props (as well as any other
 * props passed) to add to an icon. The size is determined
 * first by checking if a `size` prop has been passed, then
 * if a `scale` prop has been passed, then by the context
 * size and finally the context scale.
 */
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
