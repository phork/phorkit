import { createContext } from 'react';
import { BannerWithContextItemType } from './BannerFromContext';

export interface BannerContextValue {
  notifications: Map<string, BannerWithContextItemType>;
  createNotification: (banner: BannerWithContextItemType) => string | undefined;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const BannerContext = createContext<BannerContextValue>({
  notifications: new Map(),
  createNotification: (/* banner */) => undefined,
  removeNotification: (/* id */) => {},
  clearNotifications: () => {},
});
