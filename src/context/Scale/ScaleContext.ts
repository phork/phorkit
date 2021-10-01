import { createContext } from 'react';
import { IconScale } from '../../types';

export type ScaleContextValue = {
  /** The icon scale (eg. small, medium, large) */
  scale?: IconScale;
  /** The exact numeric size */
  size?: number;
};

export const ScaleContext = createContext<ScaleContextValue>({
  scale: undefined,
  size: undefined,
});
