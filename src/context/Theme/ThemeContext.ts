import React from 'react';
import { Theme } from '../../types';

export interface ThemeContextValue {
  themeId?: Theme;
  toggleThemeId: (forceThemeId: Theme) => Theme | undefined;
}

export const ThemeContext = React.createContext<ThemeContextValue>({
  themeId: undefined,
  toggleThemeId: (/* forceThemeId */) => undefined,
});