/* eslint-disable import/export */
import { render, RenderOptions } from '@testing-library/react';
import React, { FC, ReactElement } from 'react';
import { AccessibilityProvider, ThemeProvider } from 'lib';

const AllTheProviders: FC = ({ children }) => {
  return (
    <ThemeProvider themeId="light">
      <AccessibilityProvider>{children}</AccessibilityProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
