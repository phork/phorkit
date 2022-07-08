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
  /** If the position is `[left|right]-[top|bottom]` then the triangle can be a corner triangle (eg. flat top or bottom) */
  cornerTriangle?: boolean;
  position?: AnyPosition;
  tooltipClassName?: string;
  triangleBorderColor?: string;
  triangleBorderWidth?: number;
  triangleColor: string;
  triangleSize?: number;
  /** Don't center the tooltip relative to the toggle */
  uncentered?: boolean;
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
  cornerTriangle = false,
  layout,
  offset: initOffset,
  position,
  renderChildren,
  tooltipClassName,
  triangleBorderColor,
  triangleBorderWidth,
  triangleColor,
  triangleSize,
  uncentered = false,
  ...props
}: InlineTooltipProps<F>): React.ReactElement {
  const offset = initOffset || getTooltipOffset({ cornerTriangle, position, layout });

  return (
    <InlinePopover<F>
      isTooltip
      centered={!uncentered}
      layout={layout}
      offset={offset}
      position={position}
      renderChildren={({ close, focusRef, isTogglerFocused, offset, position, visible }) => {
        if (position === 'stacked' || position === 'stacked-right') {
          throw new Error('Invalid tooltip position');
        }

        const content = renderChildren
          ? renderFromPropWithFallback<PopoverRenderChildrenProps<InlinePopoverContentHTMLElement, F>>(renderChildren, {
              close,
              focusRef,
              isTogglerFocused,
              offset,
              position,
              visible,
            })
          : children;

        if (!content) throw new Error('Missing tooltip content');

        return (
          <TooltipContent
            className={tooltipClassName}
            cornerTriangle={cornerTriangle}
            layout={layout}
            offset={offset}
            position={position}
            triangleBorderColor={triangleBorderColor}
            triangleBorderWidth={triangleBorderWidth}
            triangleColor={triangleColor}
            triangleSize={triangleSize}
          >
            {content}
          </TooltipContent>
        );
      }}
      {...props}
    />
  );
}

InlineTooltip.displayName = 'InlineTooltip';
