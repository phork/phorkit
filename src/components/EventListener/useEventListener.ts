import { useContext, useRef } from 'react';
import { EventListenerContext } from './EventListenerContext';
import { AddEventListenerCallback, EventListenerItemType } from './types';

export type UseEventListenerProps = Pick<EventListenerItemType, 'eventType' | 'listener' | 'options'> & {
  precedeOtherEvents?: boolean;
};

export type UseEventListenerResponse = {
  addListener: () => void;
  removeListener?: () => void;
};

export const useEventListener = ({
  eventType,
  listener,
  options,
  precedeOtherEvents = false,
}: UseEventListenerProps): UseEventListenerResponse => {
  const { unshiftEventListener, pushEventListener, removeEventListener } = useContext(EventListenerContext);
  const ref = useRef<ReturnType<AddEventListenerCallback>>();

  const addListener = () => {
    ref.current = precedeOtherEvents
      ? unshiftEventListener(eventType, listener, options)
      : pushEventListener(eventType, listener, options);
  };

  const removeListener = () => {
    ref.current && removeEventListener(ref.current, eventType, options);
  };

  return { addListener, removeListener };
};
