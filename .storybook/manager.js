import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import theme, { getThemeId } from './theme';

addons.setConfig({
  theme: { ...themes[getThemeId() === 'dark' ? 'dark' : 'normal'], ...theme(getThemeId()) },
});
