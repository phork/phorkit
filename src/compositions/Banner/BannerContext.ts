/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { BannerWithContextItemType } from './BannerFromContext';

export type BannerContextValue = {
  /** A map of all the banners */
  notifications: Map<string, BannerWithContextItemType>;
  /** Creates a new banner or replaces an existing banner if one exists with the same contextId */
  createNotification: (banner: BannerWithContextItemType) => string | undefined;
  /** Removes a banner by contextId */
  removeNotification: (id: string) => void;
  /** Removes all the banners */
  clearNotifications: () => void;
};

export const BannerContext = createContext<BannerContextValue>({
  notifications: new Map(),
  createNotification: (/* banner */) => undefined,
  removeNotification: (/* id */) => {},
  clearNotifications: () => {},
});
