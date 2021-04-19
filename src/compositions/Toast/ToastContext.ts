import { createContext } from 'react';
import { ToastItemType } from './types';

export interface ToastContextValue {
  notifications: Map<string, ToastItemType>;
  createNotification: (toast: ToastItemType) => string | undefined;
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
