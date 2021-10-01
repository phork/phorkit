import { useCallback, useMemo, useState } from 'react';
import { AbsoluteCoords, getAbsoluteCoords } from '../utils/getAbsoluteCoords';
import { useBoundsObservable } from './useBoundsObservable';

export type UseAbsoluteCoordsProps = Pick<
  Parameters<typeof getAbsoluteCoords>[0],
  'centered' | 'fixed' | 'offset' | 'position'
> & {
  initialCoords?: ReturnType<typeof getAbsoluteCoords>;
  observe?: boolean;
  ref: React.RefObject<HTMLElement>;
};

export type UseAbsoluteCoordsResponse = {
  coords?: AbsoluteCoords;
  /** A function to manually retrieve the coords and update the state */
  update: () => void;
  /** A function to start observing the coords changes */
  subscribe: () => void;
  /** A function to stop observing the coords changes */
  unsubscribe: () => void;
};

/**
 * Accepts a ref prop and returns an object containing the
 * element's coords and a subscription service to watch for
 * changes.
 */
export const useAbsoluteCoords = ({
  centered = false,
  fixed = false,
  initialCoords,
  observe = false,
  offset,
  position,
  ref,
}: UseAbsoluteCoordsProps): UseAbsoluteCoordsResponse => {
  const [coords, setCoords] = useState<UseAbsoluteCoordsProps['initialCoords']>(initialCoords);

  const processBounds = useCallback(
    (bounds: DOMRect): void => {
      const newCoords = getAbsoluteCoords({ bounds, centered, fixed, offset, position });
      setCoords(prevCoords => {
        const haveCoordsChanged = (
          ['position', 'top', 'bottom', 'left', 'right', 'transform'] as Array<keyof AbsoluteCoords>
        ).some(prop => prevCoords?.[prop] !== newCoords[prop]);
        return haveCoordsChanged ? newCoords : prevCoords;
      });
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
