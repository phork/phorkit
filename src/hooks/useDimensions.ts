import { useState, useCallback, useLayoutEffect, useRef, useMemo } from 'react';

const allMeasurableProps = ['width', 'height', 'top', 'left', 'x', 'y', 'right', 'bottom'] as const;
type MeasurableProp = typeof allMeasurableProps[number];

export interface UseDimensionsInterface {
  liveMeasure?: boolean;
  propsToMeasure?: MeasurableProp[];
}

export type UseDimensionsResponse<E extends HTMLElement> = [(node: E) => void, DOMRect, E | null];

// modified from https://github.com/Swizec/useDimensions
export function useDimensions<E extends HTMLElement>({
  liveMeasure = true,
  propsToMeasure = [...allMeasurableProps],
}: UseDimensionsInterface = {}): UseDimensionsResponse<E> {
  const [dimensions, setDimensions] = useState<DOMRect>({} as DOMRect);
  const [node, setNode] = useState<E | null>(null);
  const requestId = useRef<number>();

  const ref = useCallback<React.RefCallback<E>>(node => {
    setNode(node);
  }, []);

  useLayoutEffect((): (() => void) | undefined => {
    if (node) {
      const measure = (): void => {
        requestId.current =
          typeof window !== 'undefined'
            ? window.requestAnimationFrame((): void => {
                const newDimensions = node.getBoundingClientRect();
                const measurableDimensionsHaveChanged = propsToMeasure.some(
                  prop => dimensions[prop] !== newDimensions[prop],
                );

                if (measurableDimensionsHaveChanged) {
                  setDimensions(newDimensions);
                }
              })
            : undefined;
      };

      measure();

      if (liveMeasure) {
        if (typeof window !== 'undefined') {
          window.addEventListener('resize', measure);
          window.addEventListener('scroll', measure);
        }

        return () => {
          if (typeof window !== 'undefined') {
            window.removeEventListener('resize', measure);
            window.removeEventListener('scroll', measure);

            if (requestId.current !== undefined) {
              window.cancelAnimationFrame(requestId.current);
            }
          }
          return undefined;
        };
      }
    }

    if (typeof window !== 'undefined' && requestId.current !== undefined) {
      window.cancelAnimationFrame(requestId.current);
    }

    return undefined;
  }, [dimensions, liveMeasure, node, propsToMeasure]);

  return useMemo(() => [ref, dimensions, node], [ref, dimensions, node]);
}
