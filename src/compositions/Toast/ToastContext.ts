import { createContext } from 'react';
import { ToastWithContextItemType } from './ToastFromContext';

export interface ToastContextValue {
  notifications: Map<string, ToastWithContextItemType>;
  createNotification: (toast: ToastWithContextItemType) => string | undefined;
  removeNotification: (id: string) => void;
  pinNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const ToastContext = createContext<ToastContextValue>({
  notifications: new Map(),
  createNotification: (/* toast */) => undefined,
  pinNotification: (/* id */) => {},
  removeNotification: (/* id */) => {},
  clearNotifications: () => {},
});
