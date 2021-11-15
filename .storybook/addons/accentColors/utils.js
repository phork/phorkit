import store from 'store2';
import { accentColorMap, accentColorProps, colorGroups, STORAGE_KEY } from './constants';

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

export const renderAccentColors = accentColors => {
  const setElementStyles = (element, accentColors) => {
    accentColorProps.forEach(({ property }) => {
      if (accentColors?.[property]) {
        element?.style.setProperty(property, accentColors[property]);
      } else {
        element?.style.removeProperty(property);
      }
    });
  };

  document.querySelectorAll('iframe').forEach(iframe => {
    const iframeDocument = iframe && (iframe.contentDocument || iframe.contentWindow?.document);
    setElementStyles(iframeDocument?.querySelector('body'), accentColors);
  });

  setElementStyles(document.querySelector('body'), accentColors);
};

export const hasAccentColors = accentColors => !!accentColors && Object.values(accentColors).filter(Boolean).length > 0;

export const hasValidSources = (property, accentColors) => {
  const { derivedFrom } = accentColorProps[accentColorMap[property]];
  return derivedFrom?.every(src => isValidColor(accentColors?.[src]));
};

export const isColorInputHidden = (property, groupExpansion) => {
  const groups = colorGroups.filter(({ properties }) => properties?.includes(property));
  return groups.every(({ id, hidden }) => hidden && !groupExpansion[id]);
};
