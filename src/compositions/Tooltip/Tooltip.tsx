import { cx } from '@emotion/css';
import React, { useMemo } from 'react';
import { CornerPosition, SimplePosition, AnyPosition } from '../../types';
import { lowerCamelize } from '../../utils/case';
import { renderFromProp } from '../../utils/renderFromProp';
import { ForwardProps } from '../../components/ForwardProps';
import { Triangle } from '../../components/Triangle/Triangle';
import { PortalPopover, InlinePopover, PopoverProps, PopoverContentRenderChildrenProps } from '../Popover';
import styles from './styles/Tooltip.module.css';

export interface TooltipProps extends Omit<PopoverProps, 'position' | 'content'> {
  component: typeof PortalPopover | typeof InlinePopover;
  position?: AnyPosition;
  tooltipClassName?: string;
  triangleBorderColor?: string;
  triangleColor: string;
}

export function Tooltip({
  children,
  component: Component,
  contentProps,
  focusable,
  hoverable,
  layout,
  position: initPosition = 'top-center',
  tooltipClassName,
  triangleBorderColor,
  triangleColor,
  ...props
}: TooltipProps): React.ReactElement {
  const borderWidth = 1;
  const { withChildrenProps } = contentProps || {};

  const getTrianglePosition = (position: AnyPosition): SimplePosition | CornerPosition => {
    switch (position) {
      case 'bottom-left':
      case 'bottom-center':
      case 'bottom-right':
        return 'top';
      case 'top-left':
      case 'top-center':
      case 'top-right':
        return 'bottom';
      case 'left-top':
        return 'top-left';
      case 'left-center':
        return 'right';
      case 'left-bottom':
        return 'bottom-left';
      case 'right-top':
        return 'top-right';
      case 'right-center':
        return 'left';
      case 'right-bottom':
        return 'bottom-right';
    }
  };

  const getTriangleSize = (position: AnyPosition, isBorder?: boolean) => {
    const trianglePosition = getTrianglePosition(position);
    if (trianglePosition && ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(trianglePosition)) {
      return 6 + (isBorder ? borderWidth : 0);
    }
    return 8 + (isBorder ? borderWidth * 2 : 0);
  };

  const getTriangleStyle = (
    position: AnyPosition,
    offset?: PopoverContentRenderChildrenProps['offset'],
    isBorder?: boolean,
  ) => {
    const triangleStyle: React.CSSProperties = {
      zIndex: isBorder ? 1 : 2,
    };

    // adjust the triangle to remove any offset added to the tooltip
    if (['top-left', 'bottom-left'].includes(position)) {
      triangleStyle.right = offset?.right ? -1 * offset.right : undefined;
    } else if (['top-right', 'bottom-right'].includes(position)) {
      triangleStyle.left = offset?.left ? -1 * offset.left : undefined;
    }

    // adjust the triangle to create the border effect
    if (triangleBorderColor) {
      if (['bottom-left', 'bottom-center', 'bottom-right'].includes(position)) {
        triangleStyle.top = isBorder ? -borderWidth : borderWidth;
      } else if (['top-left', 'top-center', 'top-right'].includes(position)) {
        triangleStyle.bottom = isBorder ? -borderWidth : borderWidth;
      } else if (['left-top', 'left-center', 'left-bottom'].includes(position)) {
        triangleStyle.right = isBorder ? -borderWidth : borderWidth;
      } else if (['right-top', 'right-center', 'right-bottom'].includes(position)) {
        triangleStyle.left = isBorder ? -borderWidth : borderWidth;
      }

      if (['left-top', 'right-top'].includes(position) && !isBorder) {
        triangleStyle.top = borderWidth;
      } else if (['left-bottom', 'right-bottom'].includes(position) && !isBorder) {
        triangleStyle.bottom = borderWidth;
      }
    }

    return triangleStyle;
  };

  const offset = useMemo((): PopoverProps['offset'] => {
    if (
      ['bottom-left', 'bottom-right', 'top-left', 'top-right'].includes(initPosition) ||
      (!initPosition && layout === 'vertical')
    ) {
      return {
        horizontal: 30,
        vertical: 16,
      };
    }

    return {
      horizontal: ['left-top', 'left-bottom', 'right-top', 'right-bottom'].includes(initPosition) ? 20 : 16,
      vertical: 16,
    };
  }, [layout, initPosition]);

  return (
    <Component
      alwaysRender
      centered
      contentProps={{ ...contentProps, withChildrenProps: true }}
      focusable={focusable}
      hoverable={hoverable}
      layout={layout}
      offset={offset}
      position={initPosition}
      tooltip
      {...props}
    >
      <ForwardProps<Partial<Omit<PopoverContentRenderChildrenProps, 'position'>> & { position?: AnyPosition }>>
        {({ close, focusRef, visible, offset, position }): React.ReactElement<HTMLDivElement> | null => {
          type RenderProps = { focusRef?: React.MutableRefObject<HTMLElement> };
          const renderProps: RenderProps = {};
          focusable && (renderProps.focusRef = focusRef);

          return position ? (
            <div
              className={cx(styles.tooltip, styles[`tooltip--${lowerCamelize(position)}`], tooltipClassName)}
              style={{ '--triangle-size': `${getTriangleSize(position)}px` } as React.CSSProperties}
            >
              {triangleBorderColor && (
                <Triangle
                  className={cx(styles.tooltip__triangle)}
                  color={triangleBorderColor}
                  position={getTrianglePosition(position)}
                  size={getTriangleSize(position, true)}
                  style={getTriangleStyle(position, offset, true)}
                />
              )}

              <Triangle
                className={cx(styles.tooltip__triangle)}
                color={triangleColor}
                position={getTrianglePosition(position)}
                size={getTriangleSize(position)}
                style={getTriangleStyle(position, offset)}
              />

              {renderFromProp(
                children,
                withChildrenProps ? { close, visible, offset, position, ...renderProps } : undefined,
              )}
            </div>
          ) : null;
        }}
      </ForwardProps>
    </Component>
  );
}

Tooltip.displayName = 'Tooltip';
