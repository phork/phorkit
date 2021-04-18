import React from 'react';
import { InlinePopover } from '../Popover/InlinePopover';
import { Dropover, DropoverProps } from './Dropover';

export function InlineDropover({ ...props }: Omit<DropoverProps, 'component'>) {
  return <Dropover component={InlinePopover} {...props} />;
}

InlineDropover.displayName = 'InlineDropover';
