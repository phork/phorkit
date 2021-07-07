import produce from 'immer';
import { useCallback, useEffect, useRef, useReducer } from 'react';

enum ACTIONS {
  SET_CUSTOM = 'SET_CUSTOM',
  SET_START = 'SET_START',
  SET_DURATION = 'SET_DURATION',
  SET_FINISHED = 'SET_FINISHED',
}

interface State {
  finished?: boolean;
  loop: number;
  percent: number;
  runtime: number;
  start: ReturnType<typeof window.requestAnimationFrame>;
  options: any;
}

type Action =
  | ({ type: ACTIONS.SET_CUSTOM } & Pick<State, 'percent'>)
  | ({ type: ACTIONS.SET_START } & Pick<State, 'options' | 'start'>)
  | ({ type: ACTIONS.SET_DURATION } & Pick<State, 'loop' | 'percent' | 'runtime'>)
  | { type: ACTIONS.SET_FINISHED };

export interface UseAnimationLoopInterface {
  animate: (percent: number, options: State['options']) => void;
  duration: number;
  loops?: number;
  manual?: boolean;
  onFinish?: () => void;
  onLoop?: (args: { loop: number }) => void;
  percent?: number;
}

export type UseAnimationLoopResponse = {
  start: (options: State['options']) => void;
  stop: () => void;
};

const initialState = {} as State;

const createReducer = () => (state: State, action: Action): State => {
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

export const useAnimationLoop = ({
  animate,
  duration,
  loops,
  manual = false,
  onFinish,
  onLoop,
  percent,
}: UseAnimationLoopInterface): UseAnimationLoopResponse => {
  const requestId = useRef<number>();
  const previousState = useRef<State>({} as State);
  const previousUseAnimationLoopResponse = useRef<UseAnimationLoopResponse>({} as UseAnimationLoopResponse);
  const [state, dispatch] = useReducer(createReducer(), initialState);

  const hasStateFinishedChanged = state.finished !== previousState.current.finished;
  const hasStateLoopChanged = state.loop !== previousState.current.loop;
  const hasStatePercentChanged = state.percent !== previousState.current.percent;

  previousState.current = state;

  const tick = useCallback(
    (timestamp: number, restart?: boolean, options?: State['options']): void => {
      if (!state.start || restart) {
        return dispatch({
          type: ACTIONS.SET_START,
          start: timestamp,
          options,
        });
      }

      const runtime = loops ? Math.min(duration * loops, timestamp - state.start) : timestamp - state.start;
      const loop = Math.floor(runtime / duration);
      const percent = loops && runtime >= duration * loops ? 100 : Math.min(100, ((runtime / duration) * 100) % 100);

      return dispatch({
        type: ACTIONS.SET_DURATION,
        loop,
        percent,
        runtime,
      });
    },
    [duration, loops, state.start],
  );

  // don't run if only the animation function has changed
  useEffect((): void => {
    if (hasStateFinishedChanged || hasStatePercentChanged) {
      if (state.percent === 100 || percent || !state.finished) {
        animate(percent || state.percent, state.options);
      }
    }
  }, [animate, hasStateFinishedChanged, hasStatePercentChanged, percent, state.finished, state.options, state.percent]);

  // don't run if only the loop callback has changed
  useEffect((): void => {
    if (hasStateLoopChanged) {
      if (!state.finished) {
        if (state.loop || state.loop === 0) {
          onLoop && onLoop({ loop: state.loop });
        }
      }
    }
  }, [hasStateLoopChanged, onLoop, state.finished, state.loop]);

  useEffect((): void => {
    if (loops && state.loop >= loops) {
      dispatch({
        type: ACTIONS.SET_FINISHED,
      });
    }
  }, [loops, state.loop]);

  useEffect((): void => {
    if (percent && percent !== 100) {
      dispatch({
        type: ACTIONS.SET_CUSTOM,
        percent,
      });
    }
  }, [percent]);

  // don't run if only the animation function has changed
  useEffect((): void => {
    if (hasStateFinishedChanged && typeof window !== 'undefined') {
      if (state.finished && !percent && requestId.current !== undefined) {
        window.cancelAnimationFrame(requestId.current);
        animate(100, state.options);
      }
    }
  }, [animate, hasStateFinishedChanged, percent, state.finished, state.options]);

  // don't run if only the finish callback has changed
  useEffect((): void => {
    if (hasStateFinishedChanged) {
      if (state.finished) {
        onFinish && onFinish();
      }
    }
  }, [hasStateFinishedChanged, onFinish, state.finished]);

  // watch for the runtime to have changed and re-request animation frame
  useEffect((): void => {
    if (!state.finished && (state.start || !manual) && !percent) {
      requestId.current =
        typeof window !== 'undefined' ? window.requestAnimationFrame(timestamp => tick(timestamp)) : undefined;
    }
  }, [manual, percent, tick, state.runtime, state.finished, state.start]);

  useEffect((): (() => void) => {
    return () => {
      if (typeof window !== 'undefined' && requestId.current !== undefined) {
        window.cancelAnimationFrame(requestId.current);
      }
    };
  }, []);

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

  const stop = useCallback((): void => {
    if (typeof window !== 'undefined' && requestId.current !== undefined) {
      window.cancelAnimationFrame(requestId.current);
    }
  }, []);

  previousUseAnimationLoopResponse.current = produce(previousUseAnimationLoopResponse.current, draftState => {
    draftState.start = start;
    draftState.stop = stop;
  });
  return previousUseAnimationLoopResponse.current;
};
