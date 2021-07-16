import React from 'react';
import { SizeContext, SizeContextValue } from './SizeContext';
import { useObserveSize } from './useObserveSize';

export interface SizeProviderProps<E extends HTMLElement = HTMLDivElement> {
  children: (ref: React.MutableRefObject<E | null>) => React.ReactElement;
  observe?: boolean;
  propsToMeasure?: (keyof SizeContextValue)[];
}

export function SizeProvider<E extends HTMLElement = HTMLDivElement>({
  children,
  observe,
  propsToMeasure,
}: SizeProviderProps<E>): React.ReactNode {
  const { ref, value } = useObserveSize<E>({
    observe,
    propsToMeasure,
  });

  return <SizeContext.Provider value={value}>{children(ref)}</SizeContext.Provider>;
}

SizeProvider.displayName = 'SizeProvider';
