import produce, { castDraft } from 'immer';
import { nanoid } from 'nanoid';
import React, { useCallback, useReducer, useRef } from 'react';
import { useSafeTimeout } from '../../hooks/useSafeTimeout';
import { ToastContext, ToastContextValue } from './ToastContext';
import { ToastWithContextItemType } from './ToastFromContext';
import { toastActions as ACTIONS } from './toastActions';
import { toastReducer as reducer, ToastState } from './toastReducer';
import { ToastNotificationLevel } from './types';

const durations: Record<ToastNotificationLevel, number> = {
  custom: 8000,
  danger: 12000,
  default: 8000,
  info: 8000,
  success: 8000,
  warning: 8000,
};

export type ToastProviderProps = {
  children: React.ReactNode;
};

/**
 * The toast provider tracks a collection of toasts and
 * provides functions to create a toast, remove a toast,
 * pin a toast (prevent automatic removal), and clear all
 * toasts. It also provides a map containing all the toasts.
 */
export function ToastProvider({ children }: ToastProviderProps): JSX.Element {
  const previousValue = useRef<ToastContextValue>({} as ToastContextValue);
  const {
    setSafeTimeout,
    clearSafeTimeout: cancelScheduledRemoval,
    clearAllSafeTimeouts: clearRemovals,
  } = useSafeTimeout();
  const [state, dispatch] = useReducer(reducer, new Map() as ToastState);

  const pinNotification = useCallback<ToastContextValue['pinNotification']>(
    id => {
      cancelScheduledRemoval(id);
      dispatch({
        id,
        type: ACTIONS.PIN,
      });
    },
    [cancelScheduledRemoval],
  );

  const removeNotification = useCallback<ToastContextValue['removeNotification']>(
    id => {
      cancelScheduledRemoval(id);
      dispatch({
        id,
        type: ACTIONS.DELETE,
      });
    },
    [cancelScheduledRemoval],
  );

  // a toast with a duration of 0 is never auto-removed
  const scheduleRemoval = useCallback(
    (toast: ToastWithContextItemType) => {
      const { contextId, duration, permanent } = toast.props;
      cancelScheduledRemoval(contextId);

      if (toast && duration && !permanent) {
        setSafeTimeout(() => removeNotification(contextId), duration, contextId);
      }
    },
    [cancelScheduledRemoval, removeNotification, setSafeTimeout],
  );

  // if a toast already exists it will be overwritten and its removal time reset
  const createNotification = useCallback<ToastContextValue['createNotification']>(
    toast => {
      const { contextId = nanoid(), duration, level } = toast.props;
      const mutableToast = React.cloneElement(toast, {
        contextId,
        created: Date.now(),
        duration: typeof duration === 'number' ? duration : durations[level || 'default'],
      });

      dispatch({
        id: contextId,
        type: ACTIONS.SET,
        value: mutableToast,
      });

      scheduleRemoval(mutableToast);
      return contextId;
    },
    [scheduleRemoval],
  );

  const clearNotifications = useCallback<ToastContextValue['clearNotifications']>(() => {
    dispatch({ type: ACTIONS.CLEAR });
    clearRemovals();
  }, [clearRemovals]);

  const value = produce(previousValue.current, draftState => {
    draftState.notifications = castDraft(state);
    draftState.clearNotifications = clearNotifications;
    draftState.createNotification = createNotification;
    draftState.pinNotification = pinNotification;
    draftState.removeNotification = removeNotification;
  });
  previousValue.current = value;

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

ToastProvider.displayName = 'ToastProvider';
