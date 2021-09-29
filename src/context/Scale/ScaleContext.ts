import { createContext } from 'react';
import { IconScale } from '../../types';

export interface ScaleContextValue {
  /** The scale is a string that maps to a numeric size (eg. small, medium, large) */
  scale?: IconScale;
  /** The exact numeric size */
  size?: number;
}

export const ScaleContext = createContext<ScaleContextValue>({
  scale: undefined,
  size: undefined,
});
