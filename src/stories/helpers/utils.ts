import memoize from 'memoize-one';
import { ThemeColorIds, themes } from 'config/themes';
import { Theme } from '../../types/ui';

export const getPrimaryColorIds = memoize((themeId: Theme): ThemeColorIds[] =>
  Object.keys(themes[themeId]).reduce((acc, prop: string) => {
    const matches = prop.match(/^color-((P)([0-9]+))$/);
    if (matches && matches[1]) {
      acc.push(matches[1] as ThemeColorIds);
    }
    return acc;
  }, [] as ThemeColorIds[]),
);
