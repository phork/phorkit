import { cx } from '@emotion/css';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useAbsoluteCoords, UseAbsoluteCoordsProps } from '../../hooks/useAbsoluteCoords';
import styles from './styles/Portal.module.css';

export interface PortalProps
  extends Pick<UseAbsoluteCoordsProps, 'centered' | 'offset' | 'position'>,
    React.HTMLAttributes<HTMLDivElement> {
  alwaysRender?: boolean;
  children: React.ReactNode;
  className?: string;
  container?: HTMLElement;
  focusable?: boolean;
  focusRef?: React.Ref<HTMLElement>;
  height?: number;
  initialCoords?: UseAbsoluteCoordsProps['initialCoords'];
  observe?: boolean;
  parentRef: React.MutableRefObject<HTMLDivElement>;
  portal?: 'fixed' | 'absolute';
  visible?: boolean;
  width?: number | string;
}

export const Portal = React.forwardRef<HTMLDivElement, PortalProps>(
  (
    {
      alwaysRender = false,
      centered = false,
      children,
      className,
      container: initContainer,
      focusable = false,
      focusRef,
      height,
      initialCoords,
      observe = false,
      offset,
      parentRef,
      portal = 'absolute',
      position,
      style,
      visible = false,
      width,
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

    return position && (visible || alwaysRender) && coords && container
      ? ReactDOM.createPortal(
          /* eslint-disable react/jsx-indent */
          <div
            className={cx(styles.portal, visible && styles['is-visible'], className)}
            ref={forwardedRef}
            style={{
              height: height && `${height}px`,
              width: width && `${width}px`,
              ...style,
              ...coords,
            }}
            {...props}
          >
            {children}
          </div>,
          /* eslint-enable react/jsx-indent */
          container,
        )
      : null;
  },
);

Portal.displayName = 'Portal';
