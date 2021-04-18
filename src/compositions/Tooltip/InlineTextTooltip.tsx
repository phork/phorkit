import React from 'react';
import { InlinePopover } from '../Popover/InlinePopover';
import { TextTooltip, TextTooltipProps } from './TextTooltip';

export function InlineTextTooltip({ ...props }: Omit<TextTooltipProps, 'component' | 'content'>): React.ReactElement {
  return <TextTooltip component={InlinePopover} {...props} />;
}

InlineTextTooltip.displayName = 'InlineTextTooltip';
