import React from 'react';
import { ListRegistryItemType } from './types';

export interface ListRegistryContextValue {
  registerItem: (id: string, item: ListRegistryItemType) => void;
  unregisterItem: (id: string) => void;
  getItem: (id: string) => ListRegistryItemType | undefined;
}

export const ListRegistryContext = React.createContext<ListRegistryContextValue>({
  registerItem: (/* id, ref */) => {},
  unregisterItem: (/* id */) => {},
  getItem: (/* id */) => undefined,
});
