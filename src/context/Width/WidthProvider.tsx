import produce from 'immer';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { WidthContext, WidthContextValue } from './WidthContext';

export interface WidthProviderProps {
  children: React.ReactNode;
}

export function WidthProvider<E extends HTMLElement = HTMLDivElement>({ children }: WidthProviderProps) {
  const previousValue = useRef<WidthContextValue<E>>({} as WidthContextValue<E>);
  const [width, setWidth] = useState<number>();
  const [node, setNode] = useState<E | null>(null);
  const requestId = useRef<number>();

  const setNodeRef = useCallback<React.RefCallback<E>>(node => {
    setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () => {
        requestId.current =
          typeof window !== undefined
            ? window.requestAnimationFrame(() => {
                const { width } = node.getBoundingClientRect() || {};
                setWidth(width);
              })
            : undefined;
      };

      measure();

      window.addEventListener('resize', measure);

      return () => {
        window.removeEventListener('resize', measure);

        if (requestId.current !== undefined) {
          window.cancelAnimationFrame(requestId.current);
        }
      };
    }

    return () => {
      if (requestId.current !== undefined) {
        window.cancelAnimationFrame(requestId.current);
      }
    };
  }, [width, node]);

  const value = produce(previousValue.current, draftState => {
    draftState.width = width;
    draftState.ref = setNodeRef;
  });
  previousValue.current = value;

  return <WidthContext.Provider value={value}>{children}</WidthContext.Provider>;
}

WidthProvider.displayName = 'WidthProvider';
