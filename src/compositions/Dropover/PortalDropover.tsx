import React from 'react';
import { PortalPopover } from '../Popover/PortalPopover';
import { Dropover, DropoverProps } from './Dropover';

export function PortalDropover({ ...props }: Omit<DropoverProps, 'component' | 'portal'>) {
  return <Dropover component={PortalPopover} portal {...props} />;
}
