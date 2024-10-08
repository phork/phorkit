/* eslint-disable import/export */
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { AccessibilityProvider } from '../src/context/Accessibility/AccessibilityProvider';
import { ThemeProvider } from '../src/context/Theme/ThemeProvider';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider themeId="light">
      <AccessibilityProvider>{children}</AccessibilityProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): ReturnType<typeof render> =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
