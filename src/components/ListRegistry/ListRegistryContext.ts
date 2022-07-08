/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { ListRegistryItemType, ListRegistryState } from './types';

export type ListRegistryContextValue<E extends HTMLElement = HTMLElement> = {
  /** A map of all the registered items */
  items: ListRegistryState<E>;
  /** Adds an item to the registry */
  registerItem: (id: string, item: ListRegistryItemType<E>) => void;
  /** Removes an item from the registry by its ID */
  unregisterItem: (id: string) => void;
  /** Returns an item from the registry by its ID */
  getItem: (id: string) => ListRegistryItemType<E> | undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ListRegistryContext = createContext<ListRegistryContextValue<any>>({
  items: new Map<string, ListRegistryItemType>(),
  registerItem: (/* id, ref */) => {},
  unregisterItem: (/* id */) => {},
  getItem: (/*id */) => undefined,
});
