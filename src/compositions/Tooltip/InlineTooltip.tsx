import React from 'react';
import { AnyPosition } from '../../types';
import { renderFromPropWithFallback } from '../../utils';
import { InlinePopover, InlinePopoverProps } from '../Popover/InlinePopover';
import { InlinePopoverContentHTMLElement, PopoverRenderChildrenProps } from '../Popover/types';
import { getTooltipOffset } from './utils';
import { TooltipContent } from './TooltipContent';

export type InlineTooltipProps<F extends HTMLElement | undefined = undefined> = Omit<
  InlinePopoverProps<F>,
  'centered' | 'isTooltip' | 'position'
> & {
  position?: AnyPosition;
  tooltipClassName?: string;
  triangleBorderColor?: string;
  triangleBorderWidth?: number;
  triangleColor: string;
  triangleSize?: number;
};

/**
 * An inline tooltip is an extension of the `InlinePopover`
 * with an arrow pointing towards the toggler.
 *
 * This uses the `Popover` and `InlinePopover` components.
 *
 * @template F
 * @param F The HTML element type of the focusRef
 */
export function InlineTooltip<F extends HTMLElement | undefined = undefined>({
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
  ...props
}: InlineTooltipProps<F>): React.ReactElement {
  const offset = initOffset || getTooltipOffset({ position, layout });

  return (
    <InlinePopover<F>
      centered
      isTooltip
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
            {renderChildren
              ? renderFromPropWithFallback<PopoverRenderChildrenProps<InlinePopoverContentHTMLElement, F>>(
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

InlineTooltip.displayName = 'InlineTooltip';
