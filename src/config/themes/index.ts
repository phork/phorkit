import { Theme } from '../../types';
import { themeId as darkThemeId, theme as darkTheme } from './dark';
import { themeId as lightThemeId, theme as lightTheme } from './light';

export type ThemeColorIds = 'P05' | 'P10' | 'P15' | 'P20' | 'P25' | 'P30' | 'P35' | 'P40' | 'P45' | 'P50' | 'P55' | 'P60' | 'P65';

export type ThemeColors = typeof lightTheme;

export type ThemeMap<Theme extends string, P> = {
  [T in Theme]: P
}

export type Themes = ThemeMap<Theme, ThemeColors> & Record<'lightThemeId' | 'darkThemeId', Theme>

export const themes: Themes = {
  lightThemeId,
  light: lightTheme,
  darkThemeId,
  dark: darkTheme,
};
