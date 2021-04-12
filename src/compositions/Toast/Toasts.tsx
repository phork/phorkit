import React from 'react';
import { ToastProvider } from './ToastProvider';
import { ToastsFromContext, ToastsFromContextProps } from './ToastsFromContext';

export interface ToastsProps extends ToastsFromContextProps {
  children: React.ReactNode;
}

export function Toasts({ children, ...props }: ToastsProps): React.ReactElement {
  return (
    <ToastProvider>
      {children}
      <ToastsFromContext {...props} />
    </ToastProvider>
  );
}
