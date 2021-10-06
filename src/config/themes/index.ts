import { themeId as darkThemeId, theme as darkTheme } from './dark';
import { themeId as lightThemeId, theme as lightTheme } from './light';
import { Themes } from './types';

export * from './types';

export const themes: Themes = {
  lightThemeId,
  light: lightTheme,
  darkThemeId,
  dark: darkTheme,
};
