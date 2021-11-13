import store from 'store2';
import { STORAGE_KEY } from './constants';

export const getThemeId = () =>
  process.env.STORYBOOK_THEME_ID ||
  store.get(STORAGE_KEY) ||
  (window?.matchMedia?.('(prefers-color-scheme: dark)').matches && 'dark') ||
  'light';

export const setThemeId = themeId => {
  store.set(STORAGE_KEY, themeId);
};
