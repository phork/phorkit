import { nanoid } from 'nanoid';
import { useCallback, useEffect, useMemo, useRef } from 'react';

export type UseSafeTimeoutResponse = {
  setSafeTimeout: (callback: () => void, timeout?: number, id?: string) => string;
  clearSafeTimeout: (id: string) => void;
  clearAllSafeTimeouts: () => void;
  hasSafeTimeout: (id: string) => boolean;
};

/**
 * Returns a component-safe alternative to `setTimeout`
 * and `clearTimeout`, as well as a function to check if
 * a timeout has been set by ID.
 *
 * This uses a cleanup function to clear all timeouts
 * when the component unmounts.
 */
export const useSafeTimeout = (): UseSafeTimeoutResponse => {
  const timeouts = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const clearSafeTimeout = useCallback<UseSafeTimeoutResponse['clearSafeTimeout']>(id => {
    timeouts.current[id] && clearTimeout(timeouts.current[id]);
    delete timeouts.current[id];
  }, []);

  const clearAllSafeTimeouts = useCallback<UseSafeTimeoutResponse['clearAllSafeTimeouts']>(() => {
    Object.keys(timeouts.current).map(clearSafeTimeout);
  }, [clearSafeTimeout]);

  const setSafeTimeout = useCallback<UseSafeTimeoutResponse['setSafeTimeout']>(
    (callback, timeout, id = nanoid()) => {
      clearSafeTimeout(id);
      timeouts.current[id] = setTimeout(callback, timeout || 0);
      return id;
    },
    [clearSafeTimeout],
  );

  const hasSafeTimeout = useCallback<UseSafeTimeoutResponse['hasSafeTimeout']>(id => !!timeouts.current[id], []);

  useEffect((): UseSafeTimeoutResponse['clearAllSafeTimeouts'] => clearAllSafeTimeouts, [clearAllSafeTimeouts]);

  return useMemo(
    (): UseSafeTimeoutResponse => ({
      setSafeTimeout,
      clearSafeTimeout,
      clearAllSafeTimeouts,
      hasSafeTimeout,
    }),
    [setSafeTimeout, clearSafeTimeout, clearAllSafeTimeouts, hasSafeTimeout],
  );
};
