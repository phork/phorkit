import { withTests } from '@storybook/addon-jest';
import { themes } from '@storybook/theming';
import React from 'react';
import jestResults from '../.jest-test-results.json';
import { AccessibilityProvider } from '../src/context/Accessibility/AccessibilityProvider';
import '../src/styles/common.css';
import '../src/styles/fonts.css';
import '../src/styles/normalize.css';
import { DocsContainer } from './components/DocsContainer';
import { getThemeId } from './addons/theme/utils';
import { withTheme } from './addons/theme/withTheme';
import { getCustomTheme } from './theme';

const hasJestResults = Object.keys(jestResults).length > 0;

export const decorators = [
  withTheme,
  storyFn => <AccessibilityProvider>{storyFn()}</AccessibilityProvider>,
  hasJestResults &&
    withTests({
      results: jestResults,
    }),
].filter(Boolean);

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
    theme: { ...themes[getThemeId()], ...getCustomTheme(getThemeId()) },
  },
  options: {
    storySort: (a, b) => {
      if (a[1].kind === 'Introduction') return -1;
      if (b[1].kind === 'Introduction') return 1;

      return a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
    },
  },
};
