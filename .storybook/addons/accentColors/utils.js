import store from 'store2';
import { STORAGE_KEY } from './constants';

export const getAccentColors = () => {
  return store.get(STORAGE_KEY) || {};
};

export const setAccentColors = accentColors => {
  store.set(STORAGE_KEY, accentColors);
};

export const clearAccentColors = () => {
  store.remove(STORAGE_KEY);
};
