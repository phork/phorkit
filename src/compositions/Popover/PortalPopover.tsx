import React from 'react';
import { renderFromPropWithFallback } from '../../utils';
import { Portal, PortalProps } from '../../components/Portal';
import { Popover, PopoverProps } from './Popover';
import { PopoverContentPropsChildren, PopoverContentPropsRenderChildren, PopoverRenderChildrenProps } from './types';

export type PortalPopoverProps = Omit<PopoverProps, 'renderContent'> &
  Omit<PortalProps, 'children' | 'position' | 'visible'> & {
    contentClassName?: string;
    contentStyle?: React.CSSProperties;
    position?: PortalProps['position'];
  } & (PopoverContentPropsChildren | PopoverContentPropsRenderChildren);

export function PortalPopover({
  children,
  className,
  closeDelay,
  focusable,
  contentClassName,
  contentStyle,
  hoverable,
  ignoreClickOutside,
  initialVisible,
  isTooltip,
  layout,
  offset,
  onClose,
  onOpen,
  permanent,
  portal,
  position,
  renderChildren,
  style,
  toggler,
  withoutTogglerFocusStyle,
  withPopoverTogglerProps,
  withChildrenProps,
  ...props
}: PortalPopoverProps) {
  return (
    <Popover
      className={className}
      closeDelay={closeDelay}
      focusable={focusable}
      hoverable={hoverable}
      ignoreClickOutside={ignoreClickOutside}
      initialVisible={initialVisible}
      isTooltip={isTooltip}
      layout={layout}
      offset={offset}
      onClose={onClose}
      onOpen={onOpen}
      permanent={permanent}
      position={position}
      renderContent={({ close, focusable, focusRef, isTogglerFocused, offset, position, visible, ...contentProps }) => {
        return (
          <Portal
            className={contentClassName}
            focusable={focusable}
            focusRef={focusRef}
            offset={offset}
            portal={portal}
            position={position}
            style={contentStyle}
            visible={visible}
            {...contentProps}
            {...props}
          >
            {withChildrenProps
              ? renderFromPropWithFallback<PopoverRenderChildrenProps>(renderChildren!, {
                  close,
                  focusRef: focusable ? focusRef : undefined,
                  offset,
                  position,
                  isTogglerFocused,
                  visible,
                })
              : children}
          </Portal>
        );
      }}
      style={style}
      toggler={toggler}
      withoutTogglerFocusStyle={withoutTogglerFocusStyle}
      withPopoverTogglerProps={withPopoverTogglerProps}
    />
  );
}

PortalPopover.displayName = 'PortalPopover';
