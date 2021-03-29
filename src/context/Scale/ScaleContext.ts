import React from 'react';
import { IconScale } from '../../types';

export interface ScaleContextValue {
  scale?: IconScale;
  size?: number;
}

export const ScaleContext = React.createContext<ScaleContextValue>({
  scale: undefined,
  size: undefined,
});
