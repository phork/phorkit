/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { Theme } from '../../types';

export type ThemeContextValue = {
  /** The active theme ID */
  themeId?: Theme;
  /** Toggles between theme IDs or sets the themeId to the value passed */
  toggleThemeId: (forceThemeId?: Theme) => Theme | undefined;
  /** Clears the active themeId */
  clearThemeId: () => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
  themeId: undefined,
  toggleThemeId: (/* forceThemeId */) => undefined,
  clearThemeId: () => {},
});
