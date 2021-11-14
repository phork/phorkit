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

// see https://gist.github.com/olmokramer/82ccce673f86db7cda5e
export const isValidColor = color =>
  !!color &&
  /^(#(?:[0-9a-f]{2}){2,4}|#[0-9a-f]{3}|(?:rgba?|hsla?)\((?:\d+%?(?:deg|rad|grad|turn)?(?:,|\s)+){2,3}[\s\/]*[\d\.]+%?\))$/i.test(
    color,
  );
