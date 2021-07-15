import { useCallback, useMemo, useState } from 'react';
import { getAbsoluteCoords } from '../utils/getAbsoluteCoords';
import { useBoundsObservable } from './useBoundsObservable';

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

  const processBounds = useCallback(
    (bounds: ClientRect): void => {
      const newCoords = getAbsoluteCoords({ bounds, centered, fixed, offset, position });
      setCoords(newCoords);
    },
    [centered, fixed, offset, position],
  );

  const { update, subscribe, unsubscribe } = useBoundsObservable({
    observe,
    processBounds,
    ref,
  });

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
