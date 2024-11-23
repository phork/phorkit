/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export type SetDeepFocusContextValue<E extends HTMLElement> = {
  handleBlur: React.FocusEventHandler<E>;
  handleFocus: React.FocusEventHandler<E>;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SetDeepFocusContext = createContext<SetDeepFocusContextValue<any>>({
  handleBlur: () => {},
  handleFocus: () => {},
  setFocused: () => {},
});
