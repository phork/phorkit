import React from 'react';
import { ThemeProps } from '../../types';
import { ListRegistryProvider } from '../../components/ListRegistry/ListRegistryProvider';

export type TextboxGroupContainerProps = ThemeProps & {
  children: NonNullable<React.ReactNode>;
};

/**
 * This wraps a textbox group with the `ListRegistryProvider`
 * to facilitate changing focus between inputs.
 *
 * This uses the `ListRegistry` component.
 */
export function TextboxGroupContainer({ children }: TextboxGroupContainerProps): JSX.Element {
  return <ListRegistryProvider<HTMLInputElement>>{children}</ListRegistryProvider>;
}

TextboxGroupContainer.displayName = 'TextboxGroupContainer';
