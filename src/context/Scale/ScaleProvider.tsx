import produce from 'immer';
import React, { useRef } from 'react';
import { ScaleContext, ScaleContextValue } from './ScaleContext';

export interface ScaleProviderProps extends ScaleContextValue {
  children: React.ReactNode;
}

/**
 * The scale provider accepts and stores an icon scale
 * and/or size.
 */
export function ScaleProvider({ children, scale, size }: ScaleProviderProps): React.ReactElement {
  const previousValue = useRef<ScaleContextValue>({} as ScaleContextValue);

  const value: ScaleContextValue = produce(previousValue.current, draftState => {
    draftState.scale = scale;
    draftState.size = size;
  });
  previousValue.current = value;

  return <ScaleContext.Provider value={value}>{children}</ScaleContext.Provider>;
}

ScaleProvider.displayName = 'ScaleProvider';
