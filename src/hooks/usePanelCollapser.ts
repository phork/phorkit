import { useEffect, useCallback, useRef } from 'react';
import { SimplePosition } from '../types';
import { useAnimationLoop } from './useAnimationLoop';

export type CollapseTransition = 'squashable' | 'shiftable';

export interface UsePanelCollapserInterface {
  disableHiding?: boolean;
  duration: number;
  easing?: (percent: number) => number;
  height?: number;
  onCloseFinish?: () => void;
  onCloseStart?: () => void;
  onOpenFinish?: () => void;
  onOpenStart?: () => void;
  open?: boolean;
  position: SimplePosition;
  ref: React.RefObject<HTMLElement>;
  transition: CollapseTransition;
  unit: 'px' | 'percent';
  useMax?: boolean;
  width?: number;
}

interface DistanceInput {
  from: number;
  to: number;
  percent: number;
}

interface GetFromToInput {
  invert?: boolean;
  size: number;
  open?: boolean;
}

type GetFromToResponse = { from: number; to: number };

const distance = ({ from, to, percent }: DistanceInput): number => from + (to - from) * (percent / 100);

const getFromTo = ({ invert, size, open }: GetFromToInput): GetFromToResponse => {
  if (invert) {
    if (open) {
      return {
        from: -size,
        to: 0,
      };
    }
    return {
      from: 0,
      to: -size,
    };
  }
  if (open) {
    return {
      from: 0,
      to: size,
    };
  }
  return {
    from: size,
    to: 0,
  };
};

interface GetPropertiesInput {
  position: SimplePosition;
  transition: CollapseTransition;
  width?: number;
  height?: number;
  useMax?: boolean;
}

type GetPropertiesResponse = {
  prop: string;
  invert: boolean;
  size: number;
};

const getProperties = ({ position, transition, width, height, useMax }: GetPropertiesInput): GetPropertiesResponse => {
  switch (position) {
    case 'top':
      return {
        prop: transition === 'squashable' ? `${useMax ? 'max-' : ''}height` : 'margin-top',
        invert: transition === 'shiftable',
        size: height!,
      };

    case 'bottom':
      return {
        prop: transition === 'squashable' ? `${useMax ? 'max-' : ''}height` : 'margin-bottom',
        invert: transition === 'shiftable',
        size: height!,
      };
    case 'left':
      return {
        prop: transition === 'squashable' ? `${useMax ? 'max-' : ''}width` : 'margin-left',
        invert: transition === 'shiftable',
        size: width!,
      };
    case 'right':
      return {
        prop: transition === 'squashable' ? `${useMax ? 'max-' : ''}width` : 'margin-right',
        invert: transition === 'shiftable',
        size: width!,
      };
    default:
      throw Error('Invalid panel collapser position');
  }
};

export const usePanelCollapser = ({
  disableHiding = false,
  duration,
  easing,
  height,
  onCloseFinish,
  onCloseStart,
  onOpenFinish,
  onOpenStart,
  open = false,
  position,
  ref,
  transition,
  unit: initUnit,
  useMax = false,
  width,
}: UsePanelCollapserInterface): void => {
  const originalPanelDisplayProp = useRef<CSSStyleDeclaration['display']>();
  const wasOpen = useRef<boolean>();
  const firstRun = wasOpen.current === undefined;
  const unit = initUnit === 'percent' ? '%' : 'px';

  const hidePanel = (): void => {
    if (ref && ref.current && ref.current.style.display !== 'none') {
      originalPanelDisplayProp.current = ref.current.style.display;
      ref.current.style.display = 'none';
    }
  };

  const showPanel = (): void => {
    if (ref && ref.current) {
      ref.current.style.setProperty('display', originalPanelDisplayProp.current || 'initial');
    }
  };

  const animate = useCallback(
    (percent: number, open: boolean): void => {
      if (ref.current) {
        const { prop, invert, size } = getProperties({ position, transition, width, height, useMax });
        const { to, from } = getFromTo({ invert, size, open });

        const progress = Math.min(
          size,
          distance({
            from,
            to,
            percent: easing ? easing(percent / 100) * 100 : percent,
          }),
        );

        ref.current.style.setProperty(prop, `${progress}${unit}`);
      }
    },
    [easing, height, position, ref, transition, unit, useMax, width],
  );

  const { start, stop } = useAnimationLoop({
    animate,
    duration: firstRun ? 0 : duration,
    loops: 1,
    manual: true,
    onFinish: () => {
      if (open) {
        onOpenFinish && onOpenFinish();
      } else {
        !disableHiding && hidePanel();
        onCloseFinish && onCloseFinish();
      }
    },
    onLoop: ({ loop }) => {
      if (loop === 0) {
        if (open) {
          onOpenStart && onOpenStart();
          !disableHiding && showPanel();
        } else {
          onCloseStart && onCloseStart();
        }
      }
    },
  });

  useEffect(() => {
    if (wasOpen.current !== open) {
      wasOpen.current = !!open;
      stop();
      start(open);
    }
  }, [open, start, stop]);

  useEffect(() => {
    if (ref.current) {
      width && ref.current.style.setProperty('max-width', `${width}${unit}`);
      height && ref.current.style.setProperty('max-height', `${height}${unit}`);

      if (transition !== 'squashable') {
        width && (ref.current.style.width = `${width}${unit}`);
        height && (ref.current.style.height = `${height}${unit}`);
      }
    }
  }, [width, height, ref, transition, unit]);
};
