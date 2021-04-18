import React from 'react';
import { ModalProvider } from './ModalProvider';
import { ModalsFromContext, ModalsFromContextProps } from './ModalsFromContext';

export interface ModalsProps extends ModalsFromContextProps {
  children?: React.ReactNode;
}

export function Modals({ children, ...props }: ModalsProps): React.ReactElement {
  return (
    <ModalProvider>
      {children}
      <ModalsFromContext {...props} />
    </ModalProvider>
  );
}

Modals.displayName = 'Modals';
