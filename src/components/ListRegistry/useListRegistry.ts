import { useContext } from 'react';
import { ListRegistryContext, ListRegistryContextValue } from './ListRegistryContext';

/**
 * A simple context wrapper to return the `registerItem`,
 * `unregisterItem` and `getItem` functions as well as the
 * items map from the `ListRegistryContext`.
 */
export const useListRegistry = <E extends HTMLElement = HTMLElement>() => {
  return useContext<ListRegistryContextValue<E>>(ListRegistryContext);
};
