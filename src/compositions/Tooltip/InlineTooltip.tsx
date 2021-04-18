import React from 'react';
import { InlinePopover } from '../Popover/InlinePopover';
import { Tooltip, TooltipProps } from './Tooltip';

export function InlineTooltip({ ...props }: Omit<TooltipProps, 'component' | 'content'>): React.ReactElement {
  return <Tooltip component={InlinePopover} {...props} />;
}

InlineTooltip.displayName = 'InlineTooltip';
