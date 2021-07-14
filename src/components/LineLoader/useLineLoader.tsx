import produce from 'immer';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSafeTimeout } from '../../hooks/useSafeTimeout';
import { LineLoader, LineLoaderProps } from './LineLoader';

const fadeOutDuration = 300;
const fadeOutDelay = 100;

export interface UseLineLoaderInterface extends LineLoaderProps {
  duration?: number;
  component?: React.FC<LineLoaderProps>;
  position?: 'top' | 'bottom';
  fixed?: boolean;
  style?: React.CSSProperties;
}

type UseLineLoaderResponse = {
  onLoad?: () => void;
  loader: React.ReactElement;
  loaderFinishing: boolean;
};

/**
 * @typedef {Object} ReturnProps
 * @property {function} onLoad A callback to call when the page has loaded
 * @property {loader} ReactNode The line loader component
 * @property {loaderFinishing} boolean Whether the loader is finishing its animation
 *
 * Returns the line loader component and a callback to call
 * when the loading has finished. The callback will set the line
 * loader to 50% of the animation (where the line spans the
 * full width) and then fade out.
 *
 * @param {number} duration The animation duration in milliseconds
 * @param {object} component The component to style (LineLoader, StyledLineLoader or ColoredLineLoader)
 * @param {string} position The position of the line loader (top or bottom)
 * @param {boolean} fixed Whether to use position fixed instead of absolute
 * @return {ReturnProps}
 */
export function useLineLoader({
  duration,
  component: TransitionedLineLoader = LineLoader,
  position,
  fixed = false,
  style,
  ...props
}: UseLineLoaderInterface): UseLineLoaderResponse {
  const previousResponse = useRef<UseLineLoaderResponse>({} as UseLineLoaderResponse);
  const [loaderFinishing, setLoaderFinishing] = useState<boolean>();
  const { setSafeTimeout } = useSafeTimeout();

  useEffect(() => {
    if (loaderFinishing) {
      setSafeTimeout(() => setLoaderFinishing(false), fadeOutDuration + fadeOutDelay);
    }
  }, [loaderFinishing, setSafeTimeout]);

  const onLoad = useCallback(() => setLoaderFinishing(previous => previous === undefined), []);
  const loader = useMemo(
    () => (
      <TransitionedLineLoader
        duration={duration || 1500}
        fixed={fixed}
        percent={loaderFinishing ? 50 : undefined}
        position={position || 'top'}
        style={{
          transition: `opacity ${fadeOutDuration}ms`,
          transitionDelay: `${fadeOutDelay}ms`,
          opacity: loaderFinishing ? '0' : undefined,
          ...style,
        }}
        {...props}
      />
    ),
    [TransitionedLineLoader, duration, fixed, loaderFinishing, position, props, style],
  );

  previousResponse.current = produce(previousResponse.current, draftState => {
    draftState.onLoad = loaderFinishing === false ? undefined : onLoad;
    draftState.loader = loader;
    draftState.loaderFinishing = loaderFinishing || false;
  });
  return previousResponse.current;
}
