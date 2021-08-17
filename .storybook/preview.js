import { themes } from '@storybook/theming';
import React from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { AccessibilityProvider } from '../src/context/Accessibility/AccessibilityProvider';
import { ThemeProvider } from '../src/context/Theme/ThemeProvider';
import '../src/styles/common.css';
import '../src/styles/fonts.css';
import '../src/styles/normalize.css';

export const decorators = [
  Story => <ThemeProvider themeId={useDarkMode() ? 'dark' : 'light'}>{Story()}</ThemeProvider>,
  Story => <AccessibilityProvider>{Story()}</AccessibilityProvider>,
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: { disable: true },
  controls: {
    expanded: true,
    matchers: {
      color: /(.+)Color$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    current: 'light',
    dark: { ...themes.dark, appBg: '#17171D' },
    light: { ...themes.normal, appBg: '#FAFAFA' },
    stylePreview: true,
  },
  options: {
    storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
  },
};
