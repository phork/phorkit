import produce from 'immer';
import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { EventListenerContext, EventListenerContextValue } from './EventListenerContext';
import { eventListenerActions as ACTIONS } from './eventListenerActions';
import {
  eventListenerReducer as reducer,
  getEventTypeFromMapKey,
  getOptionsFromMapKey,
  EventListenerState,
} from './eventListenerReducer';
import { eventListenerOptions as OPTIONS, EventListenerItemType } from './types';

export interface EventListenerProviderProps {
  children: React.ReactNode;
}

const generateEventListener = (items: EventListenerItemType[]) => (event: Event) => {
  items.forEach(({ listener }) => listener(event));
};

export function EventListenerProvider({ children }: EventListenerProviderProps) {
  const previousValue = useRef<EventListenerContextValue>({} as EventListenerContextValue);
  const [state, dispatch] = useReducer(reducer, new Map() as EventListenerState);
  const previousState = useRef<EventListenerState>();
  const listeners = useRef<Record<string, ReturnType<typeof generateEventListener>>>({});

  const unshiftEventListener = useCallback<EventListenerContextValue['unshiftEventListener']>(
    (eventType, listener, options) => {
      const id = uuid();
      dispatch({
        id,
        type: ACTIONS.UNSHIFT,
        eventType,
        listener,
        options,
      });
      return id;
    },
    [],
  );

  const pushEventListener = useCallback<EventListenerContextValue['pushEventListener']>(
    (eventType, listener, options) => {
      const id = uuid();
      dispatch({
        id,
        type: ACTIONS.PUSH,
        eventType,
        listener:
          options && options.includes(OPTIONS.once)
            ? event => {
                listener(event);
                dispatch({
                  id,
                  type: ACTIONS.REMOVE,
                  eventType,
                  options,
                });
              }
            : listener,
        options,
      });
      return id;
    },
    [],
  );

  const removeEventListener = useCallback<EventListenerContextValue['removeEventListener']>(
    (id, eventType, options) =>
      dispatch({
        id,
        type: ACTIONS.REMOVE,
        eventType,
        options,
      }),
    [],
  );

  const clearListeners = useCallback<EventListenerContextValue['clearListeners']>(
    () => dispatch({ type: ACTIONS.CLEAR }),
    [],
  );

  useEffect(() => {
    if (state !== previousState.current) {
      previousState.current &&
        previousState.current.forEach((values, key) => {
          if (!state.get(key) || values !== state.get(key)) {
            const eventType = getEventTypeFromMapKey(key);
            const options = getOptionsFromMapKey(key);

            if (listeners.current[key] && typeof document !== 'undefined') {
              document.removeEventListener(
                eventType,
                listeners.current[key],
                options && options.capture ? { capture: true } : undefined,
              );
            }
          }
        });

      state &&
        state.forEach((values, key) => {
          if (!previousState.current || values !== previousState.current.get(key)) {
            const eventType = getEventTypeFromMapKey(key);
            const options = getOptionsFromMapKey(key);

            if (values.length > 0 && typeof document !== 'undefined') {
              listeners.current[key] = generateEventListener(values);
              document.addEventListener(eventType, listeners.current[key], options);
            }
          }
        });
    }

    previousState.current = state;
  }, [state]);

  const value = produce(previousValue.current, draftState => {
    draftState.events = state;
    draftState.unshiftEventListener = unshiftEventListener;
    draftState.pushEventListener = pushEventListener;
    draftState.removeEventListener = removeEventListener;
    draftState.clearListeners = clearListeners;
  });
  previousValue.current = value;

  return <EventListenerContext.Provider value={value}>{children}</EventListenerContext.Provider>;
}

EventListenerProvider.displayName = 'EventListenerProvider';
