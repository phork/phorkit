import produce from 'immer';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Theme } from '../../types';
import { ThemeContext, ThemeContextValue } from './ThemeContext';

export type ThemeProviderProps = {
  children: React.ReactNode;
  onChange?: (themeId: Theme) => void;
  themeId: Theme;
  unthemed?: boolean;
};

/**
 * The theme provider manages the theme ID in state,
 * and provides that theme ID along with functions to
 * toggle the theme and to clear the theme ID.
 */
export function ThemeProvider({
  children,
  onChange,
  themeId: propThemeId = 'light',
  unthemed = false,
}: ThemeProviderProps): JSX.Element {
  const previousValue = useRef<ThemeContextValue>({} as ThemeContextValue);
  const [themeId, setThemeId] = useState<Theme | undefined>(unthemed ? undefined : propThemeId);

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

  useEffect(() => {
    setThemeId(propThemeId);
  }, [propThemeId]);

  const value: ThemeContextValue = produce(previousValue.current, draftState => {
    draftState.themeId = themeId;
    draftState.toggleThemeId = toggleThemeId;
    draftState.clearThemeId = clearThemeId;
  });
  previousValue.current = value;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

ThemeProvider.displayName = 'ThemeProvider';
