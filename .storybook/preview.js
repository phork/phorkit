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
    matchers: {
      date: /Date$/,
    },
  },
  darkMode: {
    current: 'light',
    dark: { ...themes.dark, appBg: '#17171D' },
    light: { ...themes.normal, appBg: '#FAFAFA' },
    stylePreview: true,
  },
};
