import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Observable } from '../types/observer';
import { boundsObservable } from '../utils/boundsObservable';

export type UseBoundsObservableProps = {
  observe?: boolean;
  processBounds: (bounds: DOMRect) => void;
  ref: React.RefObject<HTMLElement>;
};

export type UseBoundsObservableResponse = {
  update: () => void;
  subscribe: () => void;
  unsubscribe: () => void;
};

/**
 * Accepts an element ref and a function to be called when
 * that element's bounding rectangle changes, as well as
 * functions to start and stop watching for the changes.
 */
export const useBoundsObservable = ({
  observe = false,
  processBounds,
  ref,
}: UseBoundsObservableProps): UseBoundsObservableResponse => {
  const observer = useRef<Observable | null>();

  const subscribe = useCallback(() => {
    observer.current && !observer.current?.observing() && observer.current.subscribe();
  }, []);

  const unsubscribe = useCallback(() => {
    observer.current && observer.current.observing() && observer.current.unsubscribe();
  }, []);

  const update = useCallback(() => {
    observer.current && !observer.current?.observing() && observer.current.once();
  }, []);

  // if the processBounds callback changes then start a new observer
  useEffect(() => {
    const observing = observer.current?.observing();
    observing && unsubscribe();

    observer.current = boundsObservable(
      {
        next: bounds => processBounds(bounds),
        error: err => console.error('Observer error: ', err) /* eslint-disable-line no-console */,
        complete: () => {} /* eslint-disable-line @typescript-eslint/no-empty-function */,
      },
      ref,
    );

    observe && subscribe();
    return () => unsubscribe();
  }, [observe, processBounds, ref, subscribe, unsubscribe]);

  return useMemo(
    () => ({
      subscribe,
      unsubscribe,
      update,
    }),
    [subscribe, unsubscribe, update],
  );
};
