import React, { useMemo, ForwardRefRenderFunction } from 'react';
import { useDeepFocus } from '../../hooks/useDeepFocus';
import { DeepFocusContext } from './DeepFocusContext';
import { SetDeepFocusContext } from './SetDeepFocus';

export type DeepFocusProviderProps = {
  children: React.ReactNode;
};

const DeepFocusProviderBase: ForwardRefRenderFunction<HTMLElement, DeepFocusProviderProps> = (
  { children },
  forwardedRef,
) => {
  const { focused, handleBlur, handleFocus, setFocused } = useDeepFocus(forwardedRef as React.RefObject<HTMLElement>);

  return (
    <DeepFocusContext.Provider value={focused}>
      <SetDeepFocusContext.Provider
        value={useMemo(() => ({ setFocused, handleBlur, handleFocus }), [handleBlur, handleFocus, setFocused])}
      >
        {children}
      </SetDeepFocusContext.Provider>
    </DeepFocusContext.Provider>
  );
};

/**
 * The deep focus provider tracks whether an element
 * or any of its children have focus.
 */
export const DeepFocusProvider = React.forwardRef(DeepFocusProviderBase);

// Note that the base element cannot have a displayName because it breaks Storybook
(DeepFocusProvider as React.NamedExoticComponent).displayName = 'DeepFocusProvider';
