import { useContext } from 'react';
import { ListRegistryContext, ListRegistryContextValue } from './ListRegistryContext';

export const useListRegistry = <E extends HTMLElement = HTMLElement>() => {
  return useContext<ListRegistryContextValue<E>>(ListRegistryContext);
};
