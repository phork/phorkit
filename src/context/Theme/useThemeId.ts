import { useContext } from 'react';
import { Theme } from '../../types';
import { ThemeContext } from './ThemeContext';

export function useThemeId(initThemeId?: Theme): Theme | 'light' {
  const { themeId: contextThemeId } = useContext(ThemeContext);
  return initThemeId || contextThemeId || 'light';
}
