import { eventListenerActions as ACTIONS, EventListenerStateAction } from './eventListenerActions';
import { eventListenerOptions as OPTIONS, EventListenerItemType } from './types';

type OptionsFromMapKey = {
  [key in keyof typeof OPTIONS]: boolean;
};

export const getOptionsFromMapKey = (mapKey: string): OptionsFromMapKey => {
  const optionSum = (mapKey?.split('-')[1] as unknown) as number;
  // eslint-disable-next-line no-bitwise
  const options = (Object.keys(OPTIONS) as (keyof typeof OPTIONS)[]).filter(
    option => (OPTIONS[option] & optionSum) > 0,
  );
  return options.reduce((acc, option) => {
    return {
      ...acc,
      [option]: true,
    };
  }, {} as OptionsFromMapKey);
};

export const getEventTypeFromMapKey = (mapKey: string): string => mapKey.split('-')[0];

export function getMapKeyByEventTypeAndOptions(eventType: string, options: OPTIONS[] = []): string {
  const optionSum = options.reduce((acc, option) => acc + option, 0);
  return [eventType, optionSum].join('-');
}

export type EventListenerState = Map<string, EventListenerItemType[]>;

export function eventListenerReducer(state: EventListenerState, action: EventListenerStateAction) {
  const mutable: EventListenerState = new Map(state);

  switch (action.type) {
    case ACTIONS.UNSHIFT: {
      const mapKey = getMapKeyByEventTypeAndOptions(action.eventType, action.options);
      const listeners = mutable.has(mapKey) ? [...(mutable.get(mapKey) || [])] : [];
      listeners.unshift({
        id: action.id,
        eventType: action.eventType,
        listener: action.listener,
        options: action.options,
      });
      mutable.set(mapKey, listeners);
      return mutable;
    }

    case ACTIONS.PUSH: {
      const mapKey = getMapKeyByEventTypeAndOptions(action.eventType, action.options);
      const listeners = mutable.has(mapKey) ? [...(mutable.get(mapKey) || [])] : [];
      listeners.push({
        id: action.id,
        eventType: action.eventType,
        listener: action.listener,
        options: action.options,
      });
      mutable.set(mapKey, listeners);
      return mutable;
    }

    case ACTIONS.REMOVE: {
      const mapKey = getMapKeyByEventTypeAndOptions(action.eventType, action.options);
      if (mutable.has(mapKey)) {
        const listeners = (mutable.get(mapKey) || []).filter(listener => listener.id !== action.id);
        if (listeners.length > 0) {
          mutable.set(mapKey, listeners);
        } else {
          mutable.delete(mapKey);
        }
        return mutable;
      }
      return state;
    }

    case ACTIONS.CLEAR:
      if (mutable.size) {
        mutable.clear();
        return mutable;
      }
      return state;

    default:
      return state;
  }
}
