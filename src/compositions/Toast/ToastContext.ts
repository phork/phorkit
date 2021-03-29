import React from 'react';
import { ToastItemType } from './types';

export interface ToastContextValue {
  notifications: Map<string, ToastItemType>;
  createNotification: (toast: ToastItemType) => void;
  removeNotification: (id: string) => void;
  pinNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const ToastContext = React.createContext<ToastContextValue>({
  notifications: new Map(),
  createNotification: (/* toast */) => {},
  pinNotification: (/* id */) => {},
  removeNotification: (/* id */) => {},
  clearNotifications: () => {},
});
