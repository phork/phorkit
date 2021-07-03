import React from 'react';
import { ThemeProps } from '../../types';
import { ListRegistryProvider } from '../../components/ListRegistry/ListRegistryProvider';

export interface TextboxGroupContainerProps extends ThemeProps {
  children: React.ReactNode;
}

export function TextboxGroupContainer({ children }: TextboxGroupContainerProps): React.ReactElement {
  return <ListRegistryProvider<HTMLInputElement>>{children}</ListRegistryProvider>;
}

TextboxGroupContainer.displayName = 'TextboxGroupContainer';
