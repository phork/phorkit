import { DocsContainer as BaseContainer, DocsContainerProps as BaseContainerProps } from '@storybook/addon-docs';
import React from 'react';
import { ErrorBoundary } from '../../src/components/ErrorBoundary';
import { Toasts } from '../../src/compositions/Toast';

type DocsContainerProps = {
  children: React.ReactNode;
  context: BaseContainerProps['context'];
};

export const DocsContainer = ({ children, context }: DocsContainerProps) => {
  return (
    <ErrorBoundary variant="page">
      <Toasts position="bottom-right">
        <BaseContainer context={context}>{children}</BaseContainer>
      </Toasts>
    </ErrorBoundary>
  );
};
