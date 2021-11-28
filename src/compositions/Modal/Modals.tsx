import React from 'react';
import { ModalProvider } from './ModalProvider';
import { ModalsFromContext, ModalsFromContextProps } from './ModalsFromContext';

export type ModalsProps = ModalsFromContextProps & {
  children?: React.ReactChild | React.ReactFragment | null;
};

/**
 * The modals component is a simple wrapper around
 * the `ModalProvider` and the `ModalsFromContext`
 * which is used to display the active modal.
 */
export function Modals({ children, ...props }: ModalsProps): JSX.Element {
  return (
    <ModalProvider>
      {children}
      <ModalsFromContext {...props} />
    </ModalProvider>
  );
}

Modals.displayName = 'Modals';
