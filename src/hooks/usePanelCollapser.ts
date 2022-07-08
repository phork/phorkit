import { useEffect, useCallback, useRef } from 'react';
import { SimplePosition } from '../types';
import { useAnimationLoop } from './useAnimationLoop';

export type CollapseTransition = 'squashable' | 'shiftable';

export type UsePanelCollapserProps = {
  disableHiding?: boolean;
  /** The duration of the animation (no duration results in an immediate change) */
  duration: number;
  /** An easing function can be used to specify the rate of change */
  easing?: (percent: number) => number;
  height?: number;
  onCloseFinish?: () => void;
  onCloseStart?: () => void;
  onOpenFinish?: () => void;
  onOpenStart?: () => void;
  /** Changing the opening value is what triggers the opening and closing */
  open?: boolean;
  /** The position of the panel so the animation direction can be determined */
  position: SimplePosition;
  ref: React.RefObject<HTMLElement>;
  transition: CollapseTransition;
  /** The unit of size for the width or height of the open panel */
  unit: 'px' | 'percent';
  /** Use max-[width|height] rather than [width|height] to set the size */
  useMax?: boolean;
  width?: number;
};

type DistanceInput = {
  from: number;
  to: number;
  percent: number;
};

const distance = ({ from, to, percent }: DistanceInput): number => from + (to - from) * (percent / 100);

type GetFromToInput = {
  invert?: boolean;
  size: number;
  open?: boolean;
};

type GetFromToResponse = { from: number; to: number };

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

type GetPropertiesInput = {
  position: SimplePosition;
  transition: CollapseTransition;
  width?: number;
  height?: number;
  useMax?: boolean;
};

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
        size: height || 0,
      };

    case 'bottom':
      return {
        prop: transition === 'squashable' ? `${useMax ? 'max-' : ''}height` : 'margin-bottom',
        invert: transition === 'shiftable',
        size: height || 0,
      };

    case 'left':
      return {
        prop: transition === 'squashable' ? `${useMax ? 'max-' : ''}width` : 'margin-left',
        invert: transition === 'shiftable',
        size: width || 0,
      };

    case 'right':
      return {
        prop: transition === 'squashable' ? `${useMax ? 'max-' : ''}width` : 'margin-right',
        invert: transition === 'shiftable',
        size: width || 0,
      };

    default:
      throw Error('Invalid panel collapser position');
  }
};

/**
 * Animates the open and closing of a vertical or horizontal
 * panel with callbacks for when the opening starts and finishes
 * and when the closing starts and finishes.
 *
 * The animation happens by updating the style on the element
 * of the ref passed.
 *
 * The panel can be closed with a squashable transition which
 * means its width/height collapses to 0, or a shiftable
 * transition which means its margin is set to a negative
 * value so that it shifts out out of the visible area.
 */
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
}: UsePanelCollapserProps): void => {
  const originalPanelDisplayProp = useRef<CSSStyleDeclaration['display']>();
  const wasOpen = useRef<boolean | undefined>(undefined);
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

  // no duration for the first run so the panel doesn't animate in or out on load
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

  // start the animation if the open prop changes
  useEffect(() => {
    if (wasOpen.current !== open) {
      wasOpen.current = !!open;
      stop();
      start(open);
    }
  }, [open, start, stop]);

  // update the panel size (and max-size when squashable) if the width or height change
  useEffect(() => {
    if (ref.current) {
      const setWidth = width !== undefined && ['left', 'right'].includes(position);
      const setHeight = height !== undefined && ['top', 'bottom'].includes(position);

      setWidth && ref.current.style.setProperty('max-width', `${width}${unit}`);
      setHeight && ref.current.style.setProperty('max-height', `${height}${unit}`);

      if (transition !== 'squashable') {
        setWidth && (ref.current.style.width = `${width}${unit}`);
        setHeight && (ref.current.style.height = `${height}${unit}`);
      }
    }
  }, [width, height, position, ref, transition, unit]);
};
