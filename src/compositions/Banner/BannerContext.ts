import React from 'react';
import { BannerItemType } from './types';

export interface BannerContextValue {
  notifications: Map<string, BannerItemType>;
  createNotification: (banner: BannerItemType) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const BannerContext = React.createContext<BannerContextValue>({
  notifications: new Map(),
  createNotification: (/* banner */) => {},
  removeNotification: (/* id */) => {},
  clearNotifications: () => {},
});
