import produce from 'immer';
import { useCallback, useEffect, useRef, useReducer } from 'react';

enum ACTIONS {
  SET_CUSTOM = 'SET_CUSTOM',
  SET_START = 'SET_START',
  SET_DURATION = 'SET_DURATION',
  SET_FINISHED = 'SET_FINISHED',
}

type State = {
  finished?: boolean;
  loop: number;
  percent: number;
  runtime: number;
  start: ReturnType<typeof window.requestAnimationFrame>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
};

type Action =
  | ({ type: ACTIONS.SET_CUSTOM } & Pick<State, 'percent'>)
  | ({ type: ACTIONS.SET_START } & Pick<State, 'options' | 'start'>)
  | ({ type: ACTIONS.SET_DURATION } & Pick<State, 'loop' | 'percent' | 'runtime'>)
  | { type: ACTIONS.SET_FINISHED };

export type UseAnimationLoopProps = {
  /** The callback that receives the updated animation percentage */
  animate: (percent: number, options: State['options']) => void;
  /** The duration of the animation before it's considered complete, or falsy for infinite */
  duration?: number;
  /** The number of loops to run the animation for, or falsy for infinite */
  loops?: number;
  /** If manual is true then the start and stop are handled by the consumer */
  manual?: boolean;
  onFinish?: () => void;
  onLoop?: (args: { loop: number }) => void;
  /** If this changes then the percent state is manually updated here */
  percent?: number;
};

export type UseAnimationLoopResponse = {
  start: (options: State['options']) => void;
  stop: () => void;
};

const initialState = {} as State;

const createReducer =
  () =>
  (state: State, action: Action): State => {
    switch (action.type) {
      case ACTIONS.SET_START:
        return {
          finished: false,
          loop: 0,
          percent: 0,
          runtime: 0,
          start: action.start,
          options: action.options,
        };

      case ACTIONS.SET_DURATION:
        return {
          ...state,
          loop: action.loop,
          percent: action.percent,
          runtime: action.runtime,
        };

      case ACTIONS.SET_FINISHED:
        return {
          ...state,
          finished: true,
          percent: 100,
        };

      case ACTIONS.SET_CUSTOM:
        return {
          ...state,
          percent: action.percent,
        };

      default:
        return state;
    }
  };

/**
 * Runs for a certain number of loops and calls the animate
 * function with each tick. The duration is used to determine
 * the loop number. If no loops are passed then this will run
 * infinitely or can be controlled with the start and stop
 * callbacks that are returned.
 */
export const useAnimationLoop = ({
  animate,
  duration,
  loops,
  manual = false,
  onFinish,
  onLoop,
  percent,
}: UseAnimationLoopProps): UseAnimationLoopResponse => {
  const requestId = useRef<number>();
  const previousState = useRef<State>({} as State);
  const previousUseAnimationLoopResponse = useRef<UseAnimationLoopResponse>({} as UseAnimationLoopResponse);
  const [state, dispatch] = useReducer(createReducer(), initialState);

  const hasStateFinishedChanged = state.finished !== previousState.current.finished;
  const hasStateLoopChanged = state.loop !== previousState.current.loop;
  const hasStatePercentChanged = state.percent !== previousState.current.percent;

  previousState.current = state;

  // updates the loop number, completion percentage and runtime with each tick
  const tick = useCallback(
    (timestamp: number, restart?: boolean, options?: State['options']): void => {
      if (!state.start || restart) {
        return dispatch({
          type: ACTIONS.SET_START,
          start: timestamp,
          options,
        });
      }

      const calculatePercent = (runtime: number, loops: number | undefined, duration: number | undefined) => {
        if (!duration) return 0;
        if (loops && duration && runtime >= duration * loops) return 100;
        return Math.min(100, ((runtime / duration) * 100) % 100);
      };

      const runtime = loops && duration ? Math.min(duration * loops, timestamp - state.start) : timestamp - state.start;
      const loop = duration ? Math.floor(runtime / duration) : 1;
      const percent = calculatePercent(runtime, loops, duration);

      return dispatch({
        type: ACTIONS.SET_DURATION,
        loop,
        percent,
        runtime,
      });
    },
    [duration, loops, state.start],
  );

  // part of the returned value used to manually start the animation
  const start = useCallback(
    (options: Pick<State, 'options'>): void => {
      if (duration === 0) {
        animate(100, options);
        onFinish && onFinish();
      } else {
        requestId.current =
          typeof window !== 'undefined'
            ? window.requestAnimationFrame(timestamp => tick(timestamp, true, options))
            : undefined;
      }
    },
    [animate, duration, onFinish, tick],
  );

  // part of the returned value used to manually stop the animation
  const stop = useCallback((): void => {
    if (typeof window !== 'undefined' && requestId.current !== undefined) {
      window.cancelAnimationFrame(requestId.current);
    }
  }, []);

  // call animate() with the new percentage if the percentage or finished flag have changed
  useEffect((): void => {
    if (hasStateFinishedChanged || hasStatePercentChanged) {
      if (state.percent === 100 || percent || !state.finished) {
        animate(percent || state.percent, state.options);
      }
    }
  }, [animate, hasStateFinishedChanged, hasStatePercentChanged, percent, state.finished, state.options, state.percent]);

  // call the onLoop callback if the number of loops have changed
  useEffect((): void => {
    if (hasStateLoopChanged) {
      if (!state.finished) {
        if (state.loop || state.loop === 0) {
          onLoop && onLoop({ loop: state.loop });
        }
      }
    }
  }, [hasStateLoopChanged, onLoop, state.finished, state.loop]);

  // flags the state as finished if the number of loops exceeds the maximum loops
  useEffect((): void => {
    if (loops && state.loop >= loops) {
      dispatch({
        type: ACTIONS.SET_FINISHED,
      });
    }
  }, [loops, state.loop]);

  // if a percent value was passed then update the percentage state
  useEffect((): void => {
    if (percent && percent !== 100) {
      dispatch({
        type: ACTIONS.SET_CUSTOM,
        percent,
      });
    }
  }, [percent]);

  // if the finished flag was set then stop running and call animate()
  useEffect((): void => {
    if (hasStateFinishedChanged && typeof window !== 'undefined') {
      if (state.finished && !percent && requestId.current !== undefined) {
        window.cancelAnimationFrame(requestId.current);
        animate(100, state.options);
      }
    }
  }, [animate, hasStateFinishedChanged, percent, state.finished, state.options]);

  // if the finished flag changes then call onFinish callback
  useEffect((): void => {
    if (hasStateFinishedChanged) {
      if (state.finished) {
        onFinish && onFinish();
      }
    }
  }, [hasStateFinishedChanged, onFinish, state.finished]);

  // watch for the runtime to have changed and re-request the animation frame
  useEffect((): void => {
    if (!state.finished && (state.start || !manual) && !percent) {
      requestId.current =
        typeof window !== 'undefined' ? window.requestAnimationFrame(timestamp => tick(timestamp)) : undefined;
    }
  }, [manual, percent, tick, state.runtime, state.finished, state.start]);

  // cancel the animation on clean up
  useEffect((): (() => void) => stop, [stop]);

  previousUseAnimationLoopResponse.current = produce(previousUseAnimationLoopResponse.current, draftState => {
    draftState.start = start;
    draftState.stop = stop;
  });
  return previousUseAnimationLoopResponse.current;
};
