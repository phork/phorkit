import { themes } from '@storybook/theming';
import React from 'react';
import { AccessibilityProvider } from '../src/context/Accessibility/AccessibilityProvider';
import { ThemeProvider } from '../src/context/Theme/ThemeProvider';
import '../src/styles/common.css';
import '../src/styles/fonts.css';
import '../src/styles/normalize.css';
import { DocsContainer } from './components/DocsContainer';
import theme, { getThemeId } from './theme';

// [TODO:themeId]
export const decorators = [
  storyFn => <ThemeProvider themeId={getThemeId()}>{storyFn()}</ThemeProvider>,
  storyFn => <AccessibilityProvider>{storyFn()}</AccessibilityProvider>,
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: { disable: true },
  controls: {
    expanded: true,
    matchers: {
      color: /^([a-zA-Z]+)Color$/,
      date: /Date$/,
    },
  },
  docs: {
    container: DocsContainer,
    source: {
      excludeDecorators: true,
    },
    theme: { ...themes[getThemeId() === 'dark' ? 'dark' : 'normal'], ...theme(getThemeId()) },
  },
  options: {
    storySort: (a, b) => {
      if (a[1].kind === 'Introduction') return -1;
      if (b[1].kind === 'Introduction') return 1;

      return a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
    },
  },
};
