import { createContext } from 'react';
import { BannerItemType } from './types';

export interface BannerContextValue {
  notifications: Map<string, BannerItemType>;
  createNotification: (banner: BannerItemType) => string | undefined;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const BannerContext = createContext<BannerContextValue>({
  notifications: new Map(),
  createNotification: (/* banner */) => undefined,
  removeNotification: (/* id */) => {},
  clearNotifications: () => {},
});
