import React from 'react';
import { SizeContext } from './SizeContext';
import { useObserveSize, UseObserveSizeOptions } from './useObserveSize';

export interface SizeProviderProps<E extends HTMLElement = HTMLDivElement> extends UseObserveSizeOptions {
  children: (ref: React.MutableRefObject<E | null>) => React.ReactElement;
}

export function SizeProvider<E extends HTMLElement = HTMLDivElement>({
  children,
  decimalPlaces,
  observe,
  propsToMeasure,
}: SizeProviderProps<E>): React.ReactNode {
  const { ref, value } = useObserveSize<E>({
    decimalPlaces,
    observe,
    propsToMeasure,
  });

  return <SizeContext.Provider value={value}>{children(ref)}</SizeContext.Provider>;
}

SizeProvider.displayName = 'SizeProvider';
