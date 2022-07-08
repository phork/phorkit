/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { ToastWithContextItemType } from './ToastFromContext';

export type ToastContextValue = {
  /** A map of all the toasts */
  notifications: Map<string, ToastWithContextItemType>;
  /** Creates a new toast or replaces an existing toast if one exists with the same contextId */
  createNotification: (toast: ToastWithContextItemType) => string | undefined;
  /** Removes a toast by contextId */
  removeNotification: (id: string) => void;
  /** Stops the automatic removal of the toast */
  pinNotification: (id: string) => void;
  /** Removes all the toasts */
  clearNotifications: () => void;
};

export const ToastContext = createContext<ToastContextValue>({
  notifications: new Map(),
  createNotification: (/* toast */) => undefined,
  pinNotification: (/* id */) => {},
  removeNotification: (/* id */) => {},
  clearNotifications: () => {},
});
