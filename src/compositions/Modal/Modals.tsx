import React from 'react';
import { ModalProvider } from './ModalProvider';
import { ModalsFromContext, ModalsFromContextProps } from './ModalsFromContext';

export interface ModalsProps extends ModalsFromContextProps {
  children?: React.ReactNode;
}

/**
 * The modals component is a simple wrapper around
 * the ModalProvider and the ModalsFromContext
 * which is used to display the active modal.
 */
export function Modals({ children, ...props }: ModalsProps): React.ReactElement {
  return (
    <ModalProvider>
      {children}
      <ModalsFromContext {...props} />
    </ModalProvider>
  );
}

Modals.displayName = 'Modals';
