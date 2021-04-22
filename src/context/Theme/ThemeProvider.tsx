import produce from 'immer';
import React, { useCallback, useRef, useState } from 'react';
import { Theme } from '../../types';
import { ThemeContext, ThemeContextValue } from './ThemeContext';

export interface ThemeProviderProps {
  children: React.ReactNode;
  onChange?: (themeId: Theme) => void;
  themeId: Theme;
  unthemed: boolean;
}

export function ThemeProvider({
  children,
  onChange,
  themeId: initThemeId = 'light',
  unthemed,
}: ThemeProviderProps): React.ReactElement {
  const previousValue = useRef<ThemeContextValue>({} as ThemeContextValue);
  const [themeId, setThemeId] = useState<Theme | undefined>(unthemed ? undefined : initThemeId);

  const toggleThemeId = useCallback<ThemeContextValue['toggleThemeId']>(
    forceThemeId => {
      const newThemeId = forceThemeId || (themeId === 'dark' ? 'light' : 'dark');
      setThemeId(newThemeId);
      onChange && onChange(newThemeId);
      return newThemeId;
    },
    [onChange, themeId],
  );

  const clearThemeId = useCallback(() => setThemeId(undefined), []);

  const value: ThemeContextValue = produce(previousValue.current, draftState => {
    draftState.themeId = themeId;
    draftState.toggleThemeId = toggleThemeId;
    draftState.clearThemeId = clearThemeId;
  });
  previousValue.current = value;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

ThemeProvider.displayName = 'ThemeProvider';
