import { ThemeProvider } from '../../../src/context/Theme/ThemeProvider';
import { getThemeId } from './utils';
import { PARAM_KEY } from './constants';

export const withTheme = (StoryFn, context) => {
  const { globals } = context;
  const themeId = globals[PARAM_KEY] || getThemeId();

  return <ThemeProvider themeId={themeId}>{StoryFn()}</ThemeProvider>;
};
