import { createContext } from 'react';
import { ListRegistryItemType, ListRegistryState } from './types';

export interface ListRegistryContextValue<E extends HTMLElement = HTMLElement> {
  registerItem: (id: string, item: ListRegistryItemType<E>) => void;
  unregisterItem: (id: string) => void;
  getItem: (id: string) => ListRegistryItemType<E> | undefined;
  items: ListRegistryState<E>;
}

export const ListRegistryContext = createContext<ListRegistryContextValue<any>>({
  registerItem: (_id, _ref) => {},
  unregisterItem: _id => {},
  getItem: _id => undefined,
  items: new Map<string, ListRegistryItemType>(),
});
