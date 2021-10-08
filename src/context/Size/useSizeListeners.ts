import { useEffect, useMemo } from 'react';
import { useObserveSize, UseObserveSizeProps, UseObserveSizeResponse } from './useObserveSize';

export type UseSizeListenersProps = UseObserveSizeProps;
export type UseSizeListenersResponse<E extends HTMLElement> = Pick<UseObserveSizeResponse<E>, 'ref' | 'value'>;

const allMeasurableProps = ['width', 'height', 'top', 'left', 'right', 'bottom'] as const;

/**
 * This is a simple hook to measure some or all of the
 * dimensions and placement of an element. Measurement
 * only happens on resize or on scroll. For a real time
 * measurement system the `useObserveSize` hook is a better
 * choice.
 */
export function useSizeListeners<E extends HTMLElement = HTMLDivElement>({
  observe = true,
  propsToMeasure = allMeasurableProps,
}: UseSizeListenersProps = {}): UseSizeListenersResponse<E> {
  const { ref, update, value } = useObserveSize<E>({ propsToMeasure });

  useEffect((): (() => void) | undefined => {
    if (observe) {
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update);
      }

      return () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', update);
          window.removeEventListener('scroll', update);
        }
        return undefined;
      };
    }
    return undefined;
  }, [observe, update]);

  // measure the size on load
  useEffect(() => update(), [update]);

  return useMemo(
    () => ({
      ref,
      value,
    }),
    [ref, value],
  );
}
