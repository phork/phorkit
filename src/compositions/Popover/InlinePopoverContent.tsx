import { cx } from '@emotion/css';
import React from 'react';
import { UseAbsoluteCoordsProps } from '../../hooks/useAbsoluteCoords';
import { lowerCamelize } from '../../utils/case';
import styles from './styles/Popover.module.css';
import { PopoverContentProps, InlinePopoverContentHTMLElement } from './types';

export type InlinePopoverContentProps<F extends HTMLElement | undefined = undefined> = Pick<
  UseAbsoluteCoordsProps,
  'centered' | 'offset' | 'position'
> &
  Omit<PopoverContentProps<InlinePopoverContentHTMLElement, F>, 'close' | 'isTogglerFocused'> &
  React.HTMLAttributes<HTMLDivElement>;

export function InlinePopoverContentBase<F extends HTMLElement | undefined = undefined>(
  {
    alwaysRender,
    centered,
    children,
    className,
    height,
    offset,
    position,
    style,
    visible,
    width,

    // remove the following props from the rest props
    focusRef,
    observe,
    relativeRef,

    ...props
  }: InlinePopoverContentProps<F>,
  forwardedRef: React.ForwardedRef<InlinePopoverContentHTMLElement>,
): React.ReactElement<InlinePopoverContentProps<F>> | null {
  return position && (visible || alwaysRender) ? (
    <div
      className={cx(
        styles.popover,
        styles[`popover--${lowerCamelize(position)}`],
        centered && styles['popover--centered'],
        visible && styles['is-visible'],
        className,
      )}
      ref={forwardedRef}
      style={{
        height: height && `${height}px`,
        width: width && `${width}px`,
        ...(offset && offset.left && { marginLeft: `${offset.left}px` }),
        ...(offset && offset.right && { marginRight: `${offset.right}px` }),
        ...(offset && offset.top && { marginTop: `${offset.top}px` }),
        ...(offset && offset.bottom && { marginBottom: `${offset.bottom}px` }),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  ) : null;
}

/**
 * The inline popover content positions the popover
 * and renders it when it's visible.
 *
 * This uses the `useAbsoluteCoords` hook.
 */
export const InlinePopoverContent = React.forwardRef(InlinePopoverContentBase) as <
  F extends HTMLElement | undefined = undefined,
>(
  p: InlinePopoverContentProps<F> & { ref?: React.Ref<InlinePopoverContentHTMLElement> },
) => React.ReactElement<InlinePopoverContentHTMLElement>;

// note that the base element cannot have a displayName because it breaks Storybook
(InlinePopoverContent as React.NamedExoticComponent).displayName = 'InlinePopoverContent';
