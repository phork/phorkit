import React from 'react';
import { useScrollSync, UseScrollSyncInterface, UseScrollSyncResponse } from '../../useScrollSync';

export interface ScrollSyncProps extends UseScrollSyncInterface {
  children: (props: UseScrollSyncResponse) => React.ReactElement;
}

export function ScrollSync({ children, horizontal, vertical }: ScrollSyncProps): React.ReactElement {
  const props = useScrollSync({ horizontal, vertical });
  return children(props);
}

ScrollSync.displayName = 'ScrollSync';
