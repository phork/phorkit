import React from 'react';
import { SizeContext } from './SizeContext';
import { useObserveSize, UseObserveSizeProps } from './useObserveSize';

export type SizeProviderProps<E extends HTMLElement = HTMLDivElement> = UseObserveSizeProps & {
  children: (ref: React.MutableRefObject<E | null>) => React.ReactElement;
};

/**
 * The size provider accepts an array of size and/or
 * position props to measure and an observe flag that's
 * used to determine if the size should be constantly
 * monitored. It provides the size of the element.
 */
export function SizeProvider<E extends HTMLElement = HTMLDivElement>({
  children,
  decimalPlaces,
  observe,
  propsToMeasure,
}: SizeProviderProps<E>): JSX.Element {
  const { ref, value } = useObserveSize<E>({
    decimalPlaces,
    observe,
    propsToMeasure,
  });

  return <SizeContext.Provider value={value}>{children(ref)}</SizeContext.Provider>;
}

SizeProvider.displayName = 'SizeProvider';
