import { useEffect, useLayoutEffect, useState } from 'react';
import { AnyPosition, StackedPosition } from '../types';

export const usePopoverPosition = (
  ref: React.RefObject<HTMLElement>,
  { position: initPosition, layout }: { position?: AnyPosition | StackedPosition; layout?: 'horizontal' | 'vertical' },
): AnyPosition | StackedPosition | undefined => {
  const [position, setPosition] = useState<AnyPosition | StackedPosition | undefined>(initPosition);

  useEffect((): void => {
    initPosition && setPosition(initPosition);
  }, [initPosition]);

  useLayoutEffect((): (() => void) => {
    const generatePosition = () => {
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

        setPosition([primary, secondary].join('-') as AnyPosition);
      }
    };

    if (!initPosition) {
      generatePosition();
      typeof window !== 'undefined' && window.addEventListener('resize', generatePosition);
    }

    return (): void => {
      typeof window !== 'undefined' && window.removeEventListener('resize', generatePosition);
    };
  }, [initPosition, layout, ref]);

  return position;
};
