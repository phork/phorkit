import React from 'react';
import { AnyPosition, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { renderFromPropWithFallback } from '../../utils';
import { InlinePopover, InlinePopoverProps } from '../Popover/InlinePopover';
import { InlinePopoverContentHTMLElement, PopoverRenderChildrenProps } from '../Popover/types';
import { getTooltipOffset } from './utils';
import { getTextTooltipColors, TextTooltipContent, TextTooltipContentProps } from './TextTooltipContent';
import { TooltipContent } from './TooltipContent';

export type InlineTextTooltipProps<F extends HTMLElement | undefined = undefined> = Omit<
  InlinePopoverProps<F>,
  'centered' | 'isTooltip' | 'position' | 'width'
> &
  Pick<ThemeProps, 'contrast'> &
  Pick<TextTooltipContentProps, 'scrollable' | 'width'> & {
    position?: AnyPosition;
    tooltipClassName?: string;
    triangleBorderWidth?: number;
    triangleSize?: number;
  } & {
    /** If the position is `[left|right]-[top|bottom]` then the triangle can be a corner triangle (eg. flat top or bottom) */
    cornerTriangle?: boolean;
    /** Don't center the tooltip relative to the toggle */
    uncentered?: boolean;
  };

/**
 * An inline text tooltip is similar to an `InlineTooltip`
 * in that it's an extension of `InlinePopover`, but
 * is also provides a standardized look and feel by
 * wrapping the children with the `TextTooltipContent`
 * component to define the colors, sizing and spacing.
 *
 * This uses the `Popover` and `InlinePopover` components.
 *
 * @template F
 * @param F The HTML element type of the focusRef
 */
export function InlineTextTooltip<F extends HTMLElement | undefined = undefined>({
  children,
  contrast = false,
  cornerTriangle = false,
  layout,
  offset: initOffset,
  position,
  renderChildren,
  scrollable,
  themeId: initThemeId,
  tooltipClassName,
  triangleBorderWidth = 2,
  triangleSize,
  uncentered = false,
  width,
  ...props
}: InlineTextTooltipProps<F>): React.ReactElement {
  const themeId = useThemeId(initThemeId);
  const { backgroundColor, borderColor } = getTextTooltipColors(themeId, contrast);

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
            triangleBorderColor={borderColor}
            triangleBorderWidth={triangleBorderWidth}
            triangleColor={backgroundColor}
            triangleSize={triangleSize}
          >
            <TextTooltipContent
              contrast={contrast}
              position={position}
              scrollable={scrollable}
              themeId={themeId}
              width={width}
            >
              {content}
            </TextTooltipContent>
          </TooltipContent>
        );
      }}
      {...props}
    />
  );
}

InlineTextTooltip.displayName = 'InlineTextTooltip';
