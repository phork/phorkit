import { cx } from '@emotion/css';
import React from 'react';
import { UseAbsoluteCoordsInterface } from '../../hooks/useAbsoluteCoords';
import { lowerCamelize } from '../../utils/case';
import { RenderFromPropElement, renderFromPropWithFallback } from '../../utils/renderFromProp';
import styles from './styles/Popover.module.css';

export interface PopoverContentInlineProps
  extends Pick<UseAbsoluteCoordsInterface, 'centered' | 'offset' | 'position'>,
    React.HTMLAttributes<HTMLDivElement> {
  alwaysRender?: boolean;
  children: RenderFromPropElement | RenderFromPropElement[];
  childrenProps: {
    close?: (timeout?: number) => void;
    togglerFocused?: boolean;
    visible?: boolean;
  };
  className?: string;
  focusable?: boolean;
  focusRef: React.MutableRefObject<HTMLElement>;
  height?: number;
  observe?: boolean;
  /** parentRef isn't used for inline popovers; it's just here for consistency */
  parentRef?: React.MutableRefObject<HTMLDivElement>;
  visible?: boolean;
  width?: number | string;
  withChildrenProps?: boolean;
}

export type PopoverContentRenderChildrenProps = Partial<Pick<PopoverContentInlineProps, 'focusRef' | 'offset'>> &
  Pick<PopoverContentInlineProps, 'position'> &
  Partial<PopoverContentInlineProps['childrenProps']>;

export const PopoverContentInline = React.forwardRef<HTMLDivElement, PopoverContentInlineProps>(
  (
    {
      alwaysRender,
      centered,
      children,
      childrenProps,
      className,
      focusable,
      focusRef,
      height,
      observe,
      offset,
      parentRef,
      position,
      visible,
      width,
      withChildrenProps,
      ...props
    },
    forwardedRef,
  ): React.ReactElement<PopoverContentInlineProps, 'div'> | null => {
    const renderProps: PopoverContentRenderChildrenProps = { position, ...childrenProps };
    focusable && (renderProps.focusRef = focusRef);
    renderProps.offset = offset;

    const content = withChildrenProps
      ? renderFromPropWithFallback<PopoverContentRenderChildrenProps>(children, renderProps)
      : children;

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
        }}
        {...props}
      >
        {content}
      </div>
    ) : null;
  },
);
