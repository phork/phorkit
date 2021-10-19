/* eslint-disable import/export */
import { render, RenderOptions } from '@testing-library/react';
import React, { FC, ReactElement } from 'react';
import { ThemeProvider } from 'lib';

const AllTheProviders: FC = ({ children }) => {
  return <ThemeProvider themeId="light">{children}</ThemeProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
