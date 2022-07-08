import React from 'react';
import { AnyPosition, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { renderFromPropWithFallback } from '../../utils';
import { PortalPopover, PortalPopoverProps } from '../Popover/PortalPopover';
import { PopoverRenderChildrenProps } from '../Popover/types';
import { getTooltipOffset } from './utils';
import { getTextTooltipColors, TextTooltipContent, TextTooltipContentProps } from './TextTooltipContent';
import { TooltipContent } from './TooltipContent';

export type PortalTextTooltipProps<F extends HTMLElement | undefined = undefined> = Omit<
  PortalPopoverProps<F>,
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
 * A portal text tooltip is similar to a `PortalTooltip`
 * in that it's an extension of the `PortalPopover`, but
 * is also provides a standardized look and feel by
 * wrapping the children with the `TextTooltipContent`
 * component to define the colors, sizing and spacing.
 *
 * This uses the `Popover` and `PortalPopover` components.
 *
 * @template F
 * @param {F} - The HTML element type of the focusRef
 */
export function PortalTextTooltip<F extends HTMLElement | undefined = undefined>({
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
  uncentered,
  width,
  ...props
}: PortalTextTooltipProps<F>): React.ReactElement {
  const themeId = useThemeId(initThemeId);
  const { backgroundColor, borderColor } = getTextTooltipColors(themeId, contrast);

  const offset = initOffset || getTooltipOffset({ cornerTriangle, position, layout });

  return (
    <PortalPopover<F>
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
          ? renderFromPropWithFallback<PopoverRenderChildrenProps<HTMLDivElement, F>>(renderChildren, {
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

PortalTextTooltip.displayName = 'PortalTextTooltip';
