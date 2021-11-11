import { Theme } from '../types';
import { themes, ThemeColors } from '../config/themes';

export type Colors = Record<string, string>;

export const getBackgroundColors = (themeId: Theme): Colors => {
  return Object.keys(themes[themeId]).reduce((acc, key: string) => {
    const matches = key.match(/^color-(BG[0-9]+)$/);
    if (matches) {
      acc[matches[0]] = themes[themeId][matches[0] as keyof ThemeColors];
    }
    return acc;
  }, {} as Colors);
};

export const getForegroundColors = (themeId: Theme): Colors => {
  return Object.keys(themes[themeId]).reduce((acc, key: string) => {
    const matches = key.match(/^color-(FG[0-9]+)$/);
    if (matches) {
      acc[matches[0]] = themes[themeId][matches[0] as keyof ThemeColors];
    }
    return acc;
  }, {} as Colors);
};

export const getPrimaryColors = (themeId: Theme): Colors => {
  return Object.keys(themes[themeId]).reduce((acc, key: string) => {
    const matches = key.match(/^color-(P[0-9]+)$/);
    if (matches) {
      acc[matches[0]] = themes[themeId][matches[0] as keyof ThemeColors];
    }
    return acc;
  }, {} as Colors);
};

export const getStateColors = (themeId: Theme): Colors => {
  return Object.keys(themes[themeId]).reduce((acc, key: string) => {
    const matches = key.match(/^color-(accent|success|warning|danger|neutral)$/);
    if (matches) {
      acc[matches[0]] = themes[themeId][matches[0] as keyof ThemeColors];
    }
    return acc;
  }, {} as Colors);
};

export const getTransparentColors = (themeId: Theme): Colors => {
  return Object.keys(themes[themeId]).reduce((acc, key: string) => {
    const matches = key.match(/^color-((.+)-O(?:[0-9]+))$/);
    if (matches) {
      acc[matches[0]] = themes[themeId][matches[0] as keyof ThemeColors];
    }
    return acc;
  }, {} as Colors);
};

export const getTransparentColorsByRoot = (themeId: Theme, root: string): Colors => {
  const colors = getTransparentColors(themeId);
  return Object.keys(colors).reduce((acc, key: string) => {
    if (key.startsWith(`color-${root}-`)) {
      acc[key] = colors[key];
    }
    return acc;
  }, {} as Colors);
};
