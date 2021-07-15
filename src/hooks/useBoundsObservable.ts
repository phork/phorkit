import { useLayoutEffect, useCallback, useMemo, useRef } from 'react';
import { boundsObservable } from '../utils/boundsObservable';

export interface UseBoundsObservableInterface {
  observe?: boolean;
  processBounds: (bounds: ClientRect) => void;
  ref: React.RefObject<HTMLElement>;
}

export const useBoundsObservable = ({ observe = false, processBounds, ref }: UseBoundsObservableInterface) => {
  const observer = useRef(
    boundsObservable(
      {
        next: bounds => processBounds(bounds),
        error: err => console.error('Observer error: ', err) /* eslint-disable-line no-console */,
        complete: () => {},
      },
      ref,
    ),
  );

  const update = useCallback(() => {
    !observer.current.observing() && observer.current.once();
  }, []);

  const subscribe = useCallback(() => {
    !observer.current.observing() && observer.current.subscribe();
  }, []);

  const unsubscribe = useCallback(() => {
    observer.current.observing() && observer.current.unsubscribe();
  }, []);

  useLayoutEffect(() => {
    observe && subscribe();
    typeof window !== 'undefined' && window.addEventListener('resize', update);

    return () => {
      unsubscribe();
      typeof window !== 'undefined' && window.removeEventListener('resize', update);
    };
  }, [update, subscribe, unsubscribe, observe]);

  return useMemo(
    () => ({
      update,
      subscribe,
      unsubscribe,
    }),
    [subscribe, unsubscribe, update],
  );
};
