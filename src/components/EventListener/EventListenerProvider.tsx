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
  ref?: React.RefObject<HTMLElement>;
}

const generateEventListener = (items: EventListenerItemType[]) => (event: Event) => {
  items.forEach(({ listener }) => listener(event));
};

/**
 * The event listener provider is used to track a
 * stack of events. Events can be added to the start
 * or end of the stack. It returns functions to add
 * and remove listeners and to clear all the listeners,
 * as well as the stack of events. If no ref element
 * is provided then the events are added to the
 * document element.
 */
export function EventListenerProvider({ children, ref }: EventListenerProviderProps) {
  const previousValue = useRef<EventListenerContextValue>({} as EventListenerContextValue);
  const [state, dispatch] = useReducer(reducer, new Map() as EventListenerState);
  const listeners = useRef<Record<string, ReturnType<typeof generateEventListener>>>({});
  const removers = useRef<Array<() => void>>([]);

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

  useEffect((): (() => void) | undefined => {
    const element = ref?.current || (typeof document !== undefined && document) || undefined;

    const removeEventListeners = () => {
      removers.current.forEach(remover => remover());
    };

    const addEventListeners = () => {
      element &&
        state &&
        state.forEach((values, key) => {
          const eventType = getEventTypeFromMapKey(key);
          const options = getOptionsFromMapKey(key);

          if (values.length > 0) {
            listeners.current[key] = generateEventListener(values);
            element.addEventListener(eventType, listeners.current[key], options);

            removers.current.push(() => element.removeEventListener(eventType, listeners.current[key], options));
          }
        });
    };

    addEventListeners();
    return removeEventListeners;
  }, [ref, state]);

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
