import { cx } from '@emotion/css';
import React from 'react';
import { UseAbsoluteCoordsInterface } from '../../hooks/useAbsoluteCoords';
import { lowerCamelize } from '../../utils/case';
import styles from './styles/Popover.module.css';
import { PopoverContentProps } from './types';

export type InlinePopoverContentProps = Pick<UseAbsoluteCoordsInterface, 'centered' | 'offset' | 'position'> &
  Omit<PopoverContentProps, 'close' | 'isTogglerFocused'> &
  React.HTMLAttributes<HTMLDivElement>;

const InlinePopoverContentBase = React.forwardRef<HTMLDivElement, InlinePopoverContentProps>(
  (
    {
      alwaysRender,
      centered,
      children,
      className,
      focusable,
      focusRef,
      height,
      observe,
      offset,
      parentRef,
      position,
      style,
      visible,
      width,
      ...props
    },
    forwardedRef,
  ): React.ReactElement<InlinePopoverContentProps, 'div'> | null => {
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

export const InlinePopoverContent = React.memo<InlinePopoverContentProps>(InlinePopoverContentBase);

InlinePopoverContentBase.displayName = 'InlinePopoverContentBase';
InlinePopoverContent.displayName = 'InlinePopoverContent';
