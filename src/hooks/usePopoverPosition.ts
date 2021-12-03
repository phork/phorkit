import { useLayoutEffect, useState, useCallback } from 'react';
import { AnyPosition, StackedPosition } from '../types';

/**
 * If a position has not been set then this will
 * determine the best position based on window
 * size and toggle location.
 */
export const usePopoverPosition = (
  ref: React.RefObject<HTMLElement>,
  {
    position: initPosition,
    layout = 'vertical',
  }: { position?: AnyPosition | StackedPosition; layout?: 'horizontal' | 'vertical' },
): AnyPosition | StackedPosition | undefined => {
  const calculatePosition = useCallback(() => {
    if (ref.current) {
      const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
      const { top, bottom, left, right } = ref.current.getBoundingClientRect();
      const calculations = {
        x: {
          primarySegment: viewportWidth / 2,
          secondarySegment: viewportWidth / 3,
          elementCenter: left + (right - left) / 2,
        },
        y: {
          primarySegment: viewportHeight / 2,
          secondarySegment: viewportHeight / 3,
          elementCenter: top + (bottom - top) / 2,
        },
      };

      let primary;
      let secondary;

      if (layout === 'horizontal') {
        primary = calculations.x.elementCenter < calculations.x.primarySegment ? 'right' : 'left';
        if (calculations.y.elementCenter > calculations.y.secondarySegment) {
          if (calculations.y.elementCenter < calculations.y.secondarySegment * 2) {
            secondary = 'center';
          } else {
            secondary = 'bottom';
          }
        } else {
          secondary = 'top';
        }
      } else {
        primary = calculations.y.elementCenter < calculations.y.primarySegment ? 'bottom' : 'top';
        if (calculations.x.elementCenter > calculations.x.secondarySegment) {
          if (calculations.x.elementCenter < calculations.x.secondarySegment * 2) {
            secondary = 'center';
          } else {
            secondary = 'left';
          }
        } else {
          secondary = 'right';
        }
      }

      return [primary, secondary].join('-') as AnyPosition;
    } else {
      return layout === 'horizontal' ? 'right-center' : 'top-center';
    }
  }, [layout, ref]);

  const [position, setPosition] = useState<AnyPosition | StackedPosition | undefined>(
    initPosition || calculatePosition(),
  );

  useLayoutEffect((): (() => void) => {
    if (!initPosition) {
      setPosition(calculatePosition());
      typeof window !== 'undefined' && window.addEventListener('resize', calculatePosition);
    }

    return (): void => {
      typeof window !== 'undefined' && window.removeEventListener('resize', calculatePosition);
    };
  }, [calculatePosition, initPosition, layout, ref]);

  return position;
};
