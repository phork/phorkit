import { cx } from '@emotion/css';
import React from 'react';
import { UseAbsoluteCoordsProps } from '../../hooks/useAbsoluteCoords';
import { lowerCamelize } from '../../utils/case';
import styles from './styles/Popover.module.css';
import { PopoverContentProps } from './types';

export type InlinePopoverContentProps = Pick<UseAbsoluteCoordsProps, 'centered' | 'offset' | 'position'> &
  Omit<PopoverContentProps, 'close' | 'isTogglerFocused'> &
  React.HTMLAttributes<HTMLDivElement>;

const InlinePopoverContentBase = React.forwardRef<HTMLDivElement, InlinePopoverContentProps>(
  (
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
      focusable,
      focusRef,
      observe,
      relativeRef,

      ...props
    },
    forwardedRef,
  ): React.ReactElement<InlinePopoverContentProps> | null => {
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
  },
);

/**
 * The inline popover content positions the popover
 * and renders it when it's visible.
 *
 * This uses the useAbsoluteCoords hook.
 */
export const InlinePopoverContent = React.memo<InlinePopoverContentProps>(InlinePopoverContentBase);

InlinePopoverContentBase.displayName = 'InlinePopoverContentBase';
InlinePopoverContent.displayName = 'InlinePopoverContent';
