import { cx } from '@emotion/css';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useAbsoluteCoords, UseAbsoluteCoordsProps } from '../../hooks/useAbsoluteCoords';
import styles from './styles/Portal.module.css';

export type PortalProps = Pick<UseAbsoluteCoordsProps, 'centered' | 'offset' | 'position'> &
  React.HTMLAttributes<HTMLDivElement> & {
    /** This will render a hidden portal; otherwise hidden portals are not rendered */
    alwaysRender?: boolean;
    children: React.ReactNode;
    className?: string;
    /** This is the element that the portal will be rendered inside */
    container?: HTMLElement;
    /** If a portal is focusable it steals the focus away from its launcher and returns it on close */
    focusable?: boolean;
    /** The focus ref is applied to the element that should get the focus when the portal opens */
    focusRef?: React.Ref<HTMLElement>;
    height?: number;
    initialCoords?: UseAbsoluteCoordsProps['initialCoords'];
    observe?: boolean;
    portal?: 'fixed' | 'absolute';
    /** The relative ref is the element that the portal will be positioned relative to */
    relativeRef: React.MutableRefObject<HTMLDivElement>;
    visible?: boolean;
    width?: number | string;
  };

/**
 * A portal is a container for some content that needs
 * to render outside of its parent element. It will be
 * a direct descendent of the document body (or the
 * container prop, if passed).
 *
 * A portal can be fixed, or it can be absolutely
 * positioned. A fixed positioned portal can observe
 * the changes of the `relativeRef` element position
 * and will reposition itself accordingly.
 */
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
      portal = 'absolute',
      relativeRef,
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
      ref: relativeRef,
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
