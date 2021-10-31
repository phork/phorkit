import React from 'react';
import { useScrollSync, UseScrollSyncProps, UseScrollSyncResponse } from '../../hooks/useScrollSync';

export type ScrollSyncProps = UseScrollSyncProps & {
  children: (props: UseScrollSyncResponse) => React.ReactElement;
};

/**
 * A simple wrapper around the `useScrollSync` hook
 * that passes on the props of the hook to a children
 * function.
 */
export function ScrollSync({ children, horizontal, vertical }: ScrollSyncProps): JSX.Element {
  const props = useScrollSync({ horizontal, vertical });
  return children(props);
}

ScrollSync.displayName = 'ScrollSync';
