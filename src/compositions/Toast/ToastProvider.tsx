import produce from 'immer';
import React, { useCallback, useReducer, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { ToastItemType, ToastNotificationLevel } from './types';
import { useSafeTimeout } from '../../hooks/useSafeTimeout';
import { ToastProps } from './Toast';
import { ToastContext, ToastContextValue } from './ToastContext';
import { toastActions as ACTIONS } from './toastActions';
import { toastReducer as reducer, ToastState } from './toastReducer';

const durations: Record<ToastNotificationLevel, number> = {
  danger: 12000,
  default: 8000,
  info: 8000,
  success: 8000,
  warning: 8000,
};

export interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps): React.ReactElement {
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
  const scheduleRemoveNotification = useCallback(
    (toast: ToastItemType) => {
      const { id, duration, permanent } = toast.props;
      cancelScheduledRemoval(id);

      if (toast && duration && !permanent) {
        setSafeTimeout(() => removeNotification(id), duration, id);
      }
    },
    [cancelScheduledRemoval, removeNotification, setSafeTimeout],
  );

  // if a toast already exists it will be overwritten and its removal time reset
  const createNotification = useCallback<ToastContextValue['createNotification']>(
    toast => {
      const { id = uuid(), duration, level } = toast.props as ToastProps;
      const mutableToast = React.cloneElement(toast, {
        id,
        created: Date.now(),
        duration: typeof duration === 'number' ? duration : durations[level || 'default'],
      });

      dispatch({
        id,
        type: ACTIONS.SET,
        value: mutableToast,
      });

      scheduleRemoveNotification(mutableToast);
      return id;
    },
    [scheduleRemoveNotification],
  );

  const clearNotifications = useCallback<ToastContextValue['clearNotifications']>(() => {
    dispatch({ type: ACTIONS.CLEAR });
    clearRemovals();
  }, [clearRemovals]);

  const value = produce(previousValue.current, draftState => {
    draftState.notifications = state;
    draftState.clearNotifications = clearNotifications;
    draftState.createNotification = createNotification;
    draftState.pinNotification = pinNotification;
    draftState.removeNotification = removeNotification;
  });
  previousValue.current = value;

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}
