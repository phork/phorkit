import { useCallback, useMemo, useRef } from 'react';

type InitializerValueType = unknown;

export type UseInitializerResponse = {
  initialize: (prop: string, value?: InitializerValueType) => void;
  clearInitialized: (prop: string) => void;
  getInitialized: (prop: string) => InitializerValueType;
  isInitialized: (prop: string, value?: InitializerValueType) => InitializerValueType;
};

/**
 * Returns functions to initialize a value, to check
 * if a value has been initialized, to get the value,
 * and to clear the value.
 */
export function useInitializer(states: Record<string, InitializerValueType> = {}): UseInitializerResponse {
  const ref = useRef<Record<string, InitializerValueType>>(states);

  const initialize = useCallback<UseInitializerResponse['initialize']>(
    (prop, value = true) => {
      ref.current[prop] = value;
    },
    [ref],
  );

  const clearInitialized = useCallback<UseInitializerResponse['clearInitialized']>(
    prop => {
      delete ref.current[prop];
    },
    [ref],
  );

  const getInitialized = useCallback<UseInitializerResponse['getInitialized']>(
    prop => {
      return ref.current[prop];
    },
    [ref],
  );

  const isInitialized = useCallback<UseInitializerResponse['isInitialized']>(
    (prop, value = true) => {
      const response = !!getInitialized(prop);
      !response && value && initialize(prop, value);
      return response;
    },
    [getInitialized, initialize],
  );

  return useMemo(
    () => ({
      initialize,
      isInitialized,
      clearInitialized,
      getInitialized,
    }),
    [initialize, isInitialized, clearInitialized, getInitialized],
  );
}
