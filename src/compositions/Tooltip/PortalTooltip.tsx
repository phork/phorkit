import React from 'react';
import { PortalPopover } from '../Popover/PortalPopover';
import { Tooltip, TooltipProps } from './Tooltip';

export function PortalTooltip({ ...props }: Omit<TooltipProps, 'component' | 'content'>): React.ReactElement {
  return <Tooltip component={PortalPopover} {...props} />;
}
