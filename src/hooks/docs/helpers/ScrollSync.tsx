import React from 'react';
import { useScrollSync, UseScrollSyncProps, UseScrollSyncResponse } from '../../useScrollSync';

export interface ScrollSyncProps extends UseScrollSyncProps {
  children: (props: UseScrollSyncResponse) => React.ReactElement;
}

export function ScrollSync({ children, horizontal, vertical }: ScrollSyncProps): React.ReactElement {
  const props = useScrollSync({ horizontal, vertical });
  return children(props);
}

ScrollSync.displayName = 'ScrollSync';
