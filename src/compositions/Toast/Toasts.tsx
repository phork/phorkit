import React from 'react';
import { ToastProvider } from './ToastProvider';
import { ToastsFromContext, ToastsFromContextProps } from './ToastsFromContext';

export type ToastsProps = ToastsFromContextProps & {
  children: React.ReactNode;
};

/**
 * The toasts component is a simple wrapper around
 * the `ToastProvider` and the `ToastsFromContext`
 * which is used to display the current toasts.
 */
export function Toasts({ children, ...props }: ToastsProps): JSX.Element {
  return (
    <ToastProvider>
      {children}
      <ToastsFromContext {...props} />
    </ToastProvider>
  );
}

Toasts.displayName = 'Toasts';
