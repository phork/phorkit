import { themes } from '../src/config/themes';

export const getCustomTheme = requestedThemeId => {
  const themeId = process.env.STORYBOOK_THEME_ID || requestedThemeId;

  return {
    brandImage: `/images/phorkit-${themeId}.svg`,
    brandTitle: 'Phork/it',
    brandUrl: process.env.STORYBOOK_URL || 'https://storybook.phorkit.org',

    fontBase: 'Roboto, "Open Sans", sans-serif',

    appBg: themes[themeId]['secondary-palette-background-color'],
    appBorderColor: themes[themeId]['primary-palette-border-color'],
    appBorderRadius: 4,
    appContentBg: themes[themeId]['primary-palette-background-color'],
    barBg: themes[themeId]['primary-palette-background-color'],
    barSelectedColor: themes[themeId]['color-accent'],
    barTextColor: themes[themeId]['primary-palette-quieter-color'],
    colorPrimary: themes[themeId]['primary-palette-text-color'],
    colorSecondary: themes[themeId]['primary-palette-quieter-color'],
    inputBg: themes[themeId]['extreme-palette-background-color'],
    inputBorder: themes[themeId]['primary-palette-border-color'],
    inputBorderRadius: 4,
    inputTextColor: themes[themeId]['primary-palette-text-color'],
    textColor: themes[themeId]['primary-palette-text-color'],
    textInverseColor: themes[themeId]['primary-palette-background-color'],
    textMutedColor: themes[themeId]['primary-palette-quietest-color'],
  };
};
