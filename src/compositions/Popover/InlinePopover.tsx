import React from 'react';
import { MergeProps } from '../../types/utils';
import { renderFromPropWithFallback } from '../../utils';
import { InlinePopoverContent, InlinePopoverContentProps } from './InlinePopoverContent';
import { Popover, PopoverProps } from './Popover';
import { PopoverContentPropsChildren, PopoverContentPropsRenderChildren, PopoverRenderChildrenProps } from './types';

export type CommonInlinePopoverProps = MergeProps<
  Omit<
    InlinePopoverContentProps,
    'close' | 'focusRef' | 'isTogglerFocused' | 'offset' | 'position' | 'relativeRef' | 'visible'
  >,
  Omit<PopoverProps, 'renderContent'>
> & {
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
};

export type InlinePopoverProps = CommonInlinePopoverProps &
  (PopoverContentPropsChildren | PopoverContentPropsRenderChildren);

export function InlinePopover({
  children,
  className,
  closeDelay,
  contentClassName,
  contentStyle,
  focusable,
  hoverable,
  ignoreClickOutside,
  initialVisible,
  isTooltip,
  layout,
  offset,
  onClose,
  onOpen,
  permanent,
  position,
  renderChildren,
  style,
  toggler,
  withChildrenProps,
  withoutTogglerFocusStyle,
  withPopoverTogglerProps,
  ...props
}: InlinePopoverProps) {
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
          <InlinePopoverContent
            className={contentClassName}
            focusRef={focusRef}
            focusable={focusable}
            offset={offset}
            position={position}
            style={contentStyle}
            visible={visible}
            {...contentProps}
            {...props}
          >
            {withChildrenProps
              ? renderFromPropWithFallback<PopoverRenderChildrenProps>(renderChildren!, {
                  close,
                  focusable,
                  focusRef: focusable ? focusRef : undefined,
                  isTogglerFocused,
                  offset,
                  position,
                  visible,
                })
              : children}
          </InlinePopoverContent>
        );
      }}
      style={style}
      toggler={toggler}
      withPopoverTogglerProps={withPopoverTogglerProps}
      withoutTogglerFocusStyle={withoutTogglerFocusStyle}
    />
  );
}

InlinePopover.displayName = 'InlinePopover';
