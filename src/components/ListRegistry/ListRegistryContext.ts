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

export const ListRegistryContext = createContext<ListRegistryContextValue<any>>({
  items: new Map<string, ListRegistryItemType>(),
  registerItem: (_id, _ref) => {},
  unregisterItem: _id => {},
  getItem: _id => undefined,
});
