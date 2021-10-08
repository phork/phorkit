import { createContext } from 'react';
import { IconScale } from '../../types';

export type ScaleContextValue = {
  /** The icon scale (eg. small, medium, large) */
  scale?: IconScale;
  /** The exact numeric size by pixel (number) or em, rem, etc. (string) */
  size?: number | string;
};

export const ScaleContext = createContext<ScaleContextValue>({
  scale: undefined,
  size: undefined,
});
