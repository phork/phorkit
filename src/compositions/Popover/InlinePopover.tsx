import React from 'react';
import { Popover, PopoverProps } from './Popover';
import { PopoverContentInline } from './PopoverContentInline';

export function InlinePopover({ ...props }: Omit<PopoverProps, 'content'>) {
  return <Popover content={PopoverContentInline} {...props} />;
}

InlinePopover.displayName = 'InlinePopover';
