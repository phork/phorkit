import React from 'react';
import { renderFromPropWithFallback } from '../../utils';
import { Portal, PortalProps } from '../../components/Portal';
import { Popover, PopoverProps } from './Popover';
import {
  PopoverContentPropsChildren,
  PopoverContentPropsRenderChildren,
  PopoverRenderChildrenProps,
  PortalPopoverContentHTMLElement,
} from './types';

export type PortalPopoverProps<F extends HTMLElement | undefined = undefined> = Omit<
  PopoverProps<PortalPopoverContentHTMLElement, F>,
  'renderContent'
> &
  Omit<PortalProps, 'children' | 'focusRef' | 'initialCoords' | 'position' | 'relativeRef' | 'visible'> & {
    contentClassName?: string;
    contentStyle?: React.CSSProperties;
    position?: PortalProps['position'];
  } & (PopoverContentPropsChildren | PopoverContentPropsRenderChildren<PortalPopoverContentHTMLElement, F>);

/**
 * The portal popover extends the `Popover` component and
 * sets the `renderContent` prop so the popover content is
 * rendered in a portal (as opposed to inline).
 *
 * This accepts `onClose` and `onOpen` callbacks, however
 * the popover visibility state is controlled internally by
 * the `Popover` component.
 *
 * This uses the `Portal` component.
 *
 * @template F
 * @param {F} - The HTML element type of the focusRef
 */
export function PortalPopover<F extends HTMLElement | undefined = undefined>({
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
  ...props
}: PortalPopoverProps<F>) {
  return (
    <Popover<PortalPopoverContentHTMLElement, F>
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
        const content = renderChildren
          ? renderFromPropWithFallback<PopoverRenderChildrenProps<PortalPopoverContentHTMLElement, F>>(renderChildren, {
              close,
              focusRef,
              offset,
              position,
              isTogglerFocused,
              visible,
            })
          : children;

        if (!content) throw new Error('Missing popover content');

        return (
          <Portal
            className={contentClassName}
            offset={offset}
            portal={portal}
            position={position}
            style={contentStyle}
            visible={visible}
            {...contentProps}
            {...props}
          >
            {content}
          </Portal>
        );
      }}
      style={style}
      toggler={toggler}
      withPopoverTogglerProps={withPopoverTogglerProps}
      withoutTogglerFocusStyle={withoutTogglerFocusStyle}
    />
  );
}

PortalPopover.displayName = 'PortalPopover';
