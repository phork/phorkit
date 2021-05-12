import React from 'react';
import { AnyPosition } from '../../types';
import { useThemeId } from '../../hooks';
import { renderFromPropWithFallback } from '../../utils';
import { PortalPopover, PortalPopoverProps } from '../Popover/PortalPopover';
import { PopoverRenderChildrenProps } from '../Popover/types';
import { getTextTooltipColors, TextTooltipContent, TextTooltipContentProps } from './TextTooltipContent';
import { TooltipContent } from './TooltipContent';
import { getTooltipOffset } from './utils';

export interface PortalTextTooltipProps
  extends Omit<PortalPopoverProps, 'position' | 'width'>,
    Pick<TextTooltipContentProps, 'scrollable' | 'width'> {
  position?: AnyPosition;
  tooltipClassName?: string;
  triangleSize?: number;
}

/** A tooltip is just a popover with an arrow pointing towards the toggler */
export function PortalTextTooltip({
  children,
  contrast,
  layout,
  offset: initOffset,
  position,
  renderChildren,
  scrollable,
  themeId: initThemeId,
  tooltipClassName,
  triangleSize,
  width,
  withChildrenProps,
  ...props
}: PortalTextTooltipProps): React.ReactElement {
  const themeId = useThemeId(initThemeId);
  const { backgroundColor, borderColor } = getTextTooltipColors(themeId, contrast);

  const offset = initOffset || getTooltipOffset({ position, layout });

  return (
    <PortalPopover
      centered
      offset={offset}
      position={position}
      renderChildren={({ focusable, focusRef, isTogglerFocused, offset, position, visible }) => {
        if (position === 'stacked' || position === 'stacked-right') {
          throw new Error('Invalid tooltip position');
        }

        return (
          <TooltipContent
            className={tooltipClassName}
            layout={layout}
            offset={offset}
            position={position}
            triangleBorderColor={borderColor}
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
            </TextTooltipContent>
          </TooltipContent>
        );
      }}
      withChildrenProps
      {...props}
    />
  );
}

PortalTextTooltip.displayName = 'PortalTextTooltip';
