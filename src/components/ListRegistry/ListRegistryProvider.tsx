import React, { useCallback, useMemo, useReducer, useEffect } from 'react';
import { ListRegistryContext, ListRegistryContextValue } from './ListRegistryContext';
import { listRegistryActions as ACTIONS } from './listRegistryActions';
import { listRegistryReducer as reducer, ListRegistryState } from './listRegistryReducer';

export interface ListRegistryProviderProps {
  children: React.ReactNode;
}

export function ListRegistryProvider({ children }: ListRegistryProviderProps): React.ReactElement {
  const [state, dispatch] = useReducer(reducer, new Map() as ListRegistryState);

  const registerItem = useCallback<ListRegistryContextValue['registerItem']>(
    (id, element) =>
      dispatch({
        id,
        element,
        type: ACTIONS.REGISTER,
      }),
    [],
  );

  const unregisterItem = useCallback<ListRegistryContextValue['unregisterItem']>(
    id =>
      dispatch({
        id,
        type: ACTIONS.UNREGISTER,
      }),
    [],
  );

  const getItem = useCallback<ListRegistryContextValue['getItem']>(id => state.get(id), [state]);

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
    }),
    [getItem, registerItem, unregisterItem],
  );

  return <ListRegistryContext.Provider value={value}>{children}</ListRegistryContext.Provider>;
}
