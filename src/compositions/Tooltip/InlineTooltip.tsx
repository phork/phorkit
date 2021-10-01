import React from 'react';
import { AnyPosition } from '../../types';
import { renderFromPropWithFallback } from '../../utils';
import { InlinePopover, InlinePopoverProps } from '../Popover/InlinePopover';
import { PopoverRenderChildrenProps } from '../Popover/types';
import { getTooltipOffset } from './utils';
import { TooltipContent } from './TooltipContent';

export type InlineTooltipProps = Omit<InlinePopoverProps, 'position'> & {
  position?: AnyPosition;
  tooltipClassName?: string;
  triangleBorderColor?: string;
  triangleBorderWidth?: number;
  triangleColor: string;
  triangleSize?: number;
};

/**
 * An inline tooltip is an extension of the InlinePopover
 * with an arrow pointing towards the toggler.
 *
 * This uses the Popover and InlinePopover components.
 */
export function InlineTooltip({
  children,
  layout,
  offset: initOffset,
  position,
  renderChildren,
  tooltipClassName,
  triangleBorderColor,
  triangleBorderWidth,
  triangleColor,
  triangleSize,
  withChildrenProps,
  ...props
}: InlineTooltipProps): React.ReactElement {
  const offset = initOffset || getTooltipOffset({ position, layout });

  return (
    <InlinePopover
      centered
      isTooltip
      withChildrenProps
      offset={offset}
      position={position}
      renderChildren={({ close, focusable, focusRef, isTogglerFocused, offset, position, visible }) => {
        if (position === 'stacked' || position === 'stacked-right') {
          throw new Error('Invalid tooltip position');
        }

        return (
          <TooltipContent
            className={tooltipClassName}
            layout={layout}
            offset={offset}
            position={position}
            triangleBorderColor={triangleBorderColor}
            triangleBorderWidth={triangleBorderWidth}
            triangleColor={triangleColor}
            triangleSize={triangleSize}
          >
            {withChildrenProps
              ? renderFromPropWithFallback<PopoverRenderChildrenProps>(renderChildren!, {
                  close,
                  focusRef: focusable ? focusRef : undefined,
                  isTogglerFocused,
                  offset,
                  position,
                  visible,
                })
              : children}
          </TooltipContent>
        );
      }}
      {...props}
    />
  );
}

InlineTooltip.displayName = 'InlineTooltip';
