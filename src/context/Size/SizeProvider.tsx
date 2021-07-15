import produce from 'immer';
import React, { useCallback, useRef, useState } from 'react';
import { useBoundsObservable } from '../../hooks/useBoundsObservable';
import { SizeContext, SizeContextValue } from './SizeContext';

export interface SizeProviderProps<E extends HTMLElement = HTMLDivElement> {
  children: (ref: React.MutableRefObject<E | null>) => React.ReactElement;
  observe?: boolean;
}

export function SizeProvider<E extends HTMLElement = HTMLDivElement>({ children, observe }: SizeProviderProps<E>) {
  const previousValue = useRef<SizeContextValue>({} as SizeContextValue);
  const [size, setSize] = useState<{ width?: number; height?: number }>({});
  const ref = useRef<E>(null!);

  // this function cannot change because useBoundsObservable only instantiates once
  const processBounds = useCallback((bounds: ClientRect): void => {
    setSize(size =>
      bounds.width !== size.width || bounds.height !== size.height
        ? { width: bounds.width, height: bounds.height }
        : size,
    );
  }, []);

  useBoundsObservable({
    observe,
    processBounds,
    ref,
  });

  const value = produce(previousValue.current, draftState => {
    draftState.height = size.height;
    draftState.width = size.width;
  });
  previousValue.current = value;

  return <SizeContext.Provider value={value}>{children(ref)}</SizeContext.Provider>;
}

SizeProvider.displayName = 'SizeProvider';
