import { useCallback, useMemo, useRef } from 'react';

export type UseInitializerResponse = {
  initialize: (prop: string, value?: boolean) => void;
  clearInitialized: (prop: string) => void;
  getInitialized: (prop: string) => unknown;
  isInitialized: (prop: string, value?: boolean) => boolean;
};

export function useInitializer(states: Record<string, unknown> = {}): UseInitializerResponse {
  const ref = useRef<Record<string, unknown>>(states);

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
