import { DocsContainer as BaseContainer, DocsContainerProps as BaseContainerProps } from '@storybook/addon-docs';
import React from 'react';
import { ErrorBoundary } from '../../src/components/ErrorBoundary';
import { Toasts } from '../../src/compositions/Toast';
import { ThemeProvider } from '../../src/context/Theme/ThemeProvider';
import { getThemeId } from '../theme';

type DocsContainerProps = {
  children: React.ReactNode;
  context: BaseContainerProps['context'];
};

// [TODO:themeId]
export const DocsContainer = ({ children, context }: DocsContainerProps) => {
  return (
    <ThemeProvider themeId={getThemeId()}>
      <ErrorBoundary variant="page">
        <Toasts position="bottom-right">
          <BaseContainer context={context}>{children}</BaseContainer>
        </Toasts>
      </ErrorBoundary>
    </ThemeProvider>
  );
};
