import { DocsContainer as BaseContainer } from '@storybook/addon-docs';
import { themes } from '@storybook/theming';
import React from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { Toasts } from '../../src/compositions/Toast';

export const DocsContainer = ({ children, context }) => {
  const dark = useDarkMode();

  return (
    <Toasts position="bottom-right">
      <BaseContainer
        context={{
          ...context,
          parameters: {
            ...context.parameters,
            docs: {
              theme: dark ? themes.dark : themes.light,
            },
          },
        }}
      >
        {children}
      </BaseContainer>
    </Toasts>
  );
};
