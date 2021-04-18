import React from 'react';
import { PortalPopover } from '../Popover/PortalPopover';
import { TextTooltip, TextTooltipProps } from './TextTooltip';

export function PortalTextTooltip({ ...props }: Omit<TextTooltipProps, 'component' | 'content'>): React.ReactElement {
  return <TextTooltip component={PortalPopover} {...props} />;
}

PortalTextTooltip.displayName = 'PortalTextTooltip';
