import { themes } from '../src/config/themes';

export default themeId => ({
  // brandImage: '',
  brandTitle: 'Phork/it',
  brandUrl: 'https://phorkit.org',

  fontBase: 'Roboto, "Open Sans", sans-serif',

  appBg: themes[themeId]['primary-palette-background-color'],
  appBorderColor: themes[themeId]['primary-palette-border-color'],
  appBorderRadius: 4,
  appContentBg: themes[themeId]['extreme-palette-background-color'],
  barBg: themes[themeId]['extreme-palette-background-color'],
  barSelectedColor: themes[themeId]['primary-palette-accent-color'],
  barTextColor: themes[themeId]['primary-palette-quieter-color'],
  colorPrimary: themes[themeId]['primary-palette-text-color'],
  colorSecondary: themes[themeId]['primary-palette-quietest-color'],
  inputBg: themes[themeId]['extreme-palette-background-color'],
  inputBorder: themes[themeId]['primary-palette-border-color'],
  inputBorderRadius: 4,
  inputTextColor: themes[themeId]['primary-palette-text-color'],
  textColor: themes[themeId]['primary-palette-text-color'],
  textInverseColor: themes[themeId]['primary-palette-background-color'],
  textMutedColor: themes[themeId]['primary-palette-quietest-color'],
});

export const getThemeId = () =>
  (document.body.classList.contains('dark') && 'dark') ||
  (document.body.classList.contains('light') && 'light') ||
  (window?.matchMedia?.('(prefers-color-scheme: dark)').matches && 'dark') ||
  'light';
