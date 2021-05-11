import { useContext, useEffect, useRef } from 'react';
import { EventListenerContext } from './EventListenerContext';
import { EventListenerItemType } from './types';

export interface UseEventListenerInterface extends Pick<EventListenerItemType, 'eventType' | 'listener' | 'options'> {
  precedeOtherEvents?: boolean;
}

export type UseEventListenerResponse = {
  addListener: () => void;
  removeListener?: () => void;
};

export const useEventListener = ({
  eventType,
  listener,
  options,
  precedeOtherEvents,
}: UseEventListenerInterface): UseEventListenerResponse => {
  const { unshiftEventListener, pushEventListener, removeEventListener } = useContext(EventListenerContext);
  const ref = useRef<UseEventListenerResponse['removeListener']>();

  const addListener = () => {
    const id = precedeOtherEvents
      ? unshiftEventListener(eventType, listener, options)
      : pushEventListener(eventType, listener, options);

    ref.current = () => {
      id !== undefined && removeEventListener(id, eventType, options);
    };
  };

  // remove the event listener on unmount by returning the function to remove it
  useEffect((): UseEventListenerResponse['removeListener'] => ref.current, []);

  return { addListener, removeListener: ref.current };
};
