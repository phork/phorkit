import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import { getThemeId } from './addons/theme/utils';
import { getCustomTheme } from './theme';

addons.setConfig({
  theme: { ...themes[getThemeId()], ...getCustomTheme(getThemeId()) },
});
