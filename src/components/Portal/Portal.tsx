import { cx } from '@emotion/css';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useAbsoluteCoords, UseAbsoluteCoordsInterface } from '../../hooks/useAbsoluteCoords';
import { renderFromProp, RenderFromPropElement } from '../../utils/renderFromProp';
import styles from './styles/Portal.module.css';

export interface PortalProps
  extends Pick<UseAbsoluteCoordsInterface, 'centered' | 'offset' | 'position'>,
    React.HTMLAttributes<HTMLDivElement> {
  alwaysRender?: boolean;
  children: RenderFromPropElement | RenderFromPropElement[];
  childrenProps?: Record<string, unknown>;
  className?: string;
  container?: HTMLElement;
  focusable?: boolean;
  focusRef?: React.Ref<HTMLElement>;
  height?: number;
  initialCoords?: UseAbsoluteCoordsInterface['initialCoords'];
  observe?: boolean;
  parentRef: React.MutableRefObject<HTMLDivElement>;
  portal?: 'fixed' | 'absolute';
  visible?: boolean;
  width?: number | string;
  /** pass extra props to the children (to be used with ForwardProps) */
  withChildrenProps?: boolean;
}

export const Portal = React.forwardRef<HTMLDivElement, PortalProps>(
  (
    {
      alwaysRender,
      centered,
      children,
      childrenProps,
      className,
      container: initContainer,
      focusable,
      focusRef,
      height,
      initialCoords,
      observe,
      offset,
      parentRef,
      portal = 'absolute',
      position,
      visible,
      width,
      withChildrenProps,
      ...props
    },
    forwardedRef,
  ): React.ReactPortal | null => {
    const container = initContainer || (typeof document !== 'undefined' ? document.body : undefined);
    const fixed = portal === 'fixed';
    const { coords, update, subscribe, unsubscribe } = useAbsoluteCoords({
      centered,
      fixed,
      initialCoords,
      observe,
      offset,
      position,
      ref: parentRef,
    });

    useEffect(() => {
      if (visible) {
        fixed && observe ? subscribe() : update();
      } else {
        unsubscribe();
      }
    }, [fixed, observe, visible, subscribe, unsubscribe, update]);

    const renderProps: { focusRef?: PortalProps['focusRef'] } = childrenProps ? { ...childrenProps } : {};
    focusable && typeof children === 'function' && (renderProps.focusRef = focusRef);

    const content = withChildrenProps ? renderFromProp(children, { position, offset, ...renderProps }) : children;
    return position && (visible || alwaysRender) && coords && container
      ? ReactDOM.createPortal(
          /* eslint-disable react/jsx-indent */
          <div
            className={cx(styles.portal, visible && styles['is-visible'], className)}
            ref={forwardedRef}
            style={{
              height: height && `${height}px`,
              width: width && `${width}px`,
              ...coords,
            }}
            {...props}
          >
            {content}
          </div>,
          /* eslint-enable react/jsx-indent */
          container,
        )
      : null;
  },
);

Portal.displayName = 'Portal';
