import { DocsContainer as BaseContainer, DocsContainerProps as BaseContainerProps } from '@storybook/addon-docs';
import React from 'react';
import { ErrorBoundary } from '../../src/components/ErrorBoundary';
import { Toasts } from '../../src/compositions/Toast';
import { AccessibilityProvider } from '../../src/context/Accessibility/AccessibilityProvider';
import { ThemeProvider } from '../../src/context/Theme/ThemeProvider';
import { getThemeId } from '../addons/theme/utils';

type DocsContainerProps = {
  children: NonNullable<React.ReactNode>;
  context: BaseContainerProps['context'];
};

export const DocsContainer = ({ children, context }: DocsContainerProps) => {
  return (
    <AccessibilityProvider>
      <ThemeProvider themeId={getThemeId()}>
        <ErrorBoundary variant="page">
          <Toasts position="bottom-right">
            <BaseContainer context={context}>{children}</BaseContainer>
          </Toasts>
        </ErrorBoundary>
      </ThemeProvider>
    </AccessibilityProvider>
  );
};
