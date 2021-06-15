import React from 'react';
import { AnyPosition } from '../../types';
import { renderFromPropWithFallback } from '../../utils';
import { PortalPopover, PortalPopoverProps } from '../Popover/PortalPopover';
import { PopoverRenderChildrenProps } from '../Popover/types';
import { TooltipContent } from './TooltipContent';
import { getTooltipOffset } from './utils';

export interface PortalTooltipProps extends Omit<PortalPopoverProps, 'position'> {
  position?: AnyPosition;
  tooltipClassName?: string;
  triangleBorderColor?: string;
  triangleBorderWidth?: number;
  triangleColor: string;
  triangleSize?: number;
}

/** A tooltip is just a popover with an arrow pointing towards the toggler */
export function PortalTooltip({
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
}: PortalTooltipProps): React.ReactElement {
  const offset = initOffset || getTooltipOffset({ position, layout });

  return (
    <PortalPopover
      centered
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
      withChildrenProps
      {...props}
    />
  );
}

PortalTooltip.displayName = 'PortalTooltip';
