import { useLayoutEffect, useCallback, useMemo, useRef, useState } from 'react';
import { boundsObservable } from '../utils/boundsObservable';
import { getAbsoluteCoords } from '../utils/getAbsoluteCoords';

export interface UseAbsoluteCoordsInterface
  extends Pick<Parameters<typeof getAbsoluteCoords>[0], 'centered' | 'fixed' | 'offset' | 'position'> {
  initialCoords?: ReturnType<typeof getAbsoluteCoords>;
  observe?: boolean;
  ref: React.RefObject<HTMLElement>;
}

export const useAbsoluteCoords = ({
  centered = false,
  fixed = false,
  initialCoords,
  observe = false,
  offset,
  position,
  ref,
}: UseAbsoluteCoordsInterface) => {
  const [coords, setCoords] = useState<UseAbsoluteCoordsInterface['initialCoords']>(initialCoords);

  const processBounds = (bounds: ClientRect): void => {
    const newCoords = getAbsoluteCoords({ bounds, centered, fixed, offset, position });
    setCoords(newCoords);
  };

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
      coords,
      update,
      subscribe,
      unsubscribe,
    }),
    [coords, subscribe, unsubscribe, update],
  );
};
