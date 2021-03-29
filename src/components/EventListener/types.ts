export enum eventListenerOptions {
  capture = 1,
  once = 2,
  passive = 4,
}

export type EventListenerItemType = {
  id: string;
  eventType: string;
  listener: EventListener;
  options?: eventListenerOptions[];
};

export type AddEventListenerCallback = (
  eventType: EventListenerItemType['eventType'],
  listener: EventListenerItemType['listener'],
  options: EventListenerItemType['options'],
) => string | undefined;

export type RemoveEventListenerCallback = (
  id: string,
  eventType: EventListenerItemType['eventType'],
  options: EventListenerItemType['options'],
) => void;
