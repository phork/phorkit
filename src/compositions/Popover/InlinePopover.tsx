import React from 'react';
import { MergeProps } from '../../types/utils';
import { renderFromPropWithFallback } from '../../utils';
import { InlinePopoverContent, InlinePopoverContentProps } from './InlinePopoverContent';
import { Popover, PopoverProps } from './Popover';
import {
  PopoverContentPropsChildren,
  PopoverContentPropsRenderChildren,
  PopoverRenderChildrenProps,
  InlinePopoverContentHTMLElement,
} from './types';

export type CommonInlinePopoverProps<F extends HTMLElement | undefined = undefined> = MergeProps<
  Omit<
    InlinePopoverContentProps<F>,
    'close' | 'focusRef' | 'isTogglerFocused' | 'offset' | 'position' | 'relativeRef' | 'visible'
  >,
  Omit<PopoverProps<InlinePopoverContentHTMLElement, F>, 'renderContent'>
> & {
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
};

export type InlinePopoverProps<F extends HTMLElement | undefined = undefined> = CommonInlinePopoverProps<F> &
  (PopoverContentPropsChildren | PopoverContentPropsRenderChildren<InlinePopoverContentHTMLElement, F>);

/**
 * An inline popover extends the `Popover` component and
 * sets the `renderContent` prop so the popover content is
 * rendered inline (as opposed to a portal).
 *
 * This accepts `onClose` and `onOpen` callbacks, however
 * the popover visibility state is controlled internally
 * by the `Popover` component.
 *
 * @template F
 * @param {F} - The HTML element type of the focusRef
 */
export function InlinePopover<F extends HTMLElement | undefined = undefined>({
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
  withoutTogglerFocusStyle,
  withPopoverTogglerProps,
  ...props
}: InlinePopoverProps<F>) {
  return (
    <Popover<InlinePopoverContentHTMLElement, F>
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
      renderContent={({ close, focusRef, isTogglerFocused, offset, position, visible, ...contentProps }) => {
        const content = renderChildren
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
          : children;

        if (!content) throw new Error('Missing popover content');

        return (
          <InlinePopoverContent<F>
            className={contentClassName}
            focusRef={focusRef}
            offset={offset}
            position={position}
            style={contentStyle}
            visible={visible}
            {...contentProps}
            {...props}
          >
            {content}
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
