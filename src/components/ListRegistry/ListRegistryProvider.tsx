import React, { useCallback, useMemo, useReducer, useEffect, Reducer } from 'react';
import { ListRegistryContext, ListRegistryContextValue } from './ListRegistryContext';
import { listRegistryActions as ACTIONS, ListRegistryStateAction } from './listRegistryActions';
import { listRegistryReducer as reducer } from './listRegistryReducer';
import { ListRegistryItemType, ListRegistryState } from './types';

export type ListRegistryProviderProps = {
  children: React.ReactNode;
};

/**
 * The list registry stores a collection of `ListItem`
 * components and provides functions to register and
 * unregister items, to get an item, and to clear all
 * items. It also provides the item map itself.
 */
export function ListRegistryProvider<E extends HTMLElement = HTMLElement>({
  children,
}: ListRegistryProviderProps): JSX.Element {
  const [state, dispatch] = useReducer<Reducer<ListRegistryState<E>, ListRegistryStateAction<E>>>(
    reducer,
    new Map<string, ListRegistryItemType<E>>(),
  );

  const registerItem = useCallback<ListRegistryContextValue<E>['registerItem']>(
    (id, ref) =>
      dispatch({
        id,
        ref,
        type: ACTIONS.REGISTER,
      }),
    [],
  );

  const unregisterItem = useCallback<ListRegistryContextValue<E>['unregisterItem']>(
    id =>
      dispatch({
        id,
        type: ACTIONS.UNREGISTER,
      }),
    [],
  );

  const getItem = useCallback<ListRegistryContextValue<E>['getItem']>(id => state.get(id), [state]);

  useEffect(() => {
    return () => {
      dispatch({
        type: ACTIONS.CLEAR,
      });
    };
  }, []);

  const value = useMemo(
    () => ({
      registerItem,
      unregisterItem,
      getItem,
      items: state,
    }),
    [getItem, registerItem, state, unregisterItem],
  );

  return <ListRegistryContext.Provider value={value}>{children}</ListRegistryContext.Provider>;
}

ListRegistryProvider.displayName = 'ListRegistryProvider';
