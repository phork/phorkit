import React from 'react';
import { Portal } from '../../components/Portal';
import { Popover, PopoverProps } from './Popover';

export function PortalPopover({ ...props }: Omit<PopoverProps, 'content'>) {
  return <Popover content={Portal} {...props} />;
}

PortalPopover.displayName = 'PortalPopover';
