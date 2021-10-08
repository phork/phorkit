import produce from 'immer';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSafeTimeout } from '../../hooks/useSafeTimeout';
import { LineLoader, LineLoaderProps } from './LineLoader';

const fadeOutDuration = 300;
const fadeOutDelay = 100;

export type UseLineLoaderProps = LineLoaderProps & {
  /** The animation duration in milliseconds */
  duration?: number;
  /** The component to style (LineLoader, StyledLineLoader or ColoredLineLoader) */
  component?: React.FC<LineLoaderProps>;
  position?: 'top' | 'bottom';
  fixed?: boolean;
  style?: React.CSSProperties;
};

type UseLineLoaderResponse = {
  /** A callback to run when the loader finishes */
  onLoad?: () => void;
  /** The line loader component */
  loader: React.ReactElement;
  /** Whether the loader is finishing its animation */
  loaderFinishing: boolean;
};

/**
 * Returns the line loader component and an `onLoad`
 * callback to call when the loading has finished. The
 * callback will set the line loader to 50% of the
 * animation (where the line spans the full width) and
 * then fade out.
 */
export function useLineLoader({
  duration,
  component: TransitionedLineLoader = LineLoader,
  position,
  fixed = false,
  style,
  ...props
}: UseLineLoaderProps): UseLineLoaderResponse {
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
