import { useContext } from 'react';
import { Theme } from '../../types';
import { ThemeContext } from './ThemeContext';

/**
 * Returns only the theme ID from the context.
 * If a theme ID prop is passed then that will
 * override the contextual theme ID. If no theme
 * ID is found the light theme is used.
 */
export function useThemeId(initThemeId?: Theme): Theme {
  const { themeId: contextThemeId } = useContext(ThemeContext);
  return initThemeId || contextThemeId || ('light' as Theme);
}
