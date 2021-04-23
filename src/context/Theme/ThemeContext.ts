import { createContext } from 'react';
import { Theme } from '../../types';

export interface ThemeContextValue {
  themeId?: Theme;
  toggleThemeId: (forceThemeId: Theme) => Theme | undefined;
  clearThemeId: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  themeId: undefined,
  toggleThemeId: (/* forceThemeId */) => undefined,
  clearThemeId: () => {},
});
