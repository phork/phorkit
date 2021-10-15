import React from 'react';
import { AnyPosition } from '../../types';
import { renderFromPropWithFallback } from '../../utils';
import { PortalPopover, PortalPopoverProps } from '../Popover/PortalPopover';
import { PopoverRenderChildrenProps, PortalPopoverContentHTMLElement } from '../Popover/types';
import { getTooltipOffset } from './utils';
import { TooltipContent } from './TooltipContent';

export type PortalTooltipProps<F extends HTMLElement> = Omit<PortalPopoverProps<F>, 'position'> & {
  position?: AnyPosition;
  tooltipClassName?: string;
  triangleBorderColor?: string;
  triangleBorderWidth?: number;
  triangleColor: string;
  triangleSize?: number;
};

/**
 * A portal tooltip is an extension of the PortalPopover
 * with an arrow pointing towards the toggler.
 *
 * This uses the Popover and PortalPopover components.
 *
 * @template F
 * @param {F} - The HTML element type of the focusRef
 */
export function PortalTooltip<F extends HTMLElement>({
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
}: PortalTooltipProps<F>): React.ReactElement {
  const offset = initOffset || getTooltipOffset({ position, layout });

  return (
    <PortalPopover<F>
      centered
      isTooltip
      withChildrenProps
      offset={offset}
      position={position}
      renderChildren={({ close, focusRef, isTogglerFocused, offset, position, visible }) => {
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
              ? renderFromPropWithFallback<PopoverRenderChildrenProps<PortalPopoverContentHTMLElement, F>>(
                  renderChildren!,
                  {
                    close,
                    focusRef,
                    isTogglerFocused,
                    offset,
                    position,
                    visible,
                  },
                )
              : children}
          </TooltipContent>
        );
      }}
      {...props}
    />
  );
}

PortalTooltip.displayName = 'PortalTooltip';
