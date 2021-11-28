import { cx } from '@emotion/css';
import React from 'react';
import { CornerPosition, SimplePosition, AnyPosition, Orientation } from '../../types';
import { lowerCamelize } from '../../utils/case';
import { PositionOffset } from '../../utils/getPositionOffset';
import { Triangle } from '../../components/Triangle/Triangle';
import styles from './styles/TooltipContent.module.css';

export type TooltipContentProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactChild | React.ReactFragment;
  /** If the position is `[left|right]-[top|bottom]` then the triangle can be a corner triangle (eg. flat top or bottom) */
  cornerTriangle?: boolean;
  layout?: Orientation;
  offset?: PositionOffset;
  position?: AnyPosition;
  triangleBorderColor?: string;
  triangleBorderWidth?: number;
  triangleColor: string;
  triangleSize?: number;
};

const getTrianglePosition = (position: AnyPosition, cornerTriangle?: boolean): SimplePosition | CornerPosition => {
  switch (position) {
    case 'bottom-left':
    case 'bottom-center':
    case 'bottom-right':
      return 'top';
    case 'top-left':
    case 'top-center':
    case 'top-right':
      return 'bottom';
    case 'left-center':
      return 'right';
    case 'right-center':
      return 'left';
    case 'left-top':
      return cornerTriangle ? 'top-left' : 'right';
    case 'left-bottom':
      return cornerTriangle ? 'bottom-left' : 'right';
    case 'right-top':
      return cornerTriangle ? 'top-right' : 'left';
    case 'right-bottom':
      return cornerTriangle ? 'bottom-right' : 'left';
  }
};

const getTriangleSize = ({
  baseSize,
  cornerTriangle = false,
  position,
}: {
  baseSize?: number;
  cornerTriangle?: boolean;
  position: AnyPosition;
}) => {
  const trianglePosition = getTrianglePosition(position, cornerTriangle);
  if (trianglePosition && ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(trianglePosition)) {
    return baseSize || 6;
  }
  return baseSize || 8;
};

const getTriangleStyle = ({
  cornerTriangle = false,
  hasBorder = false,
  isBorder = false,
  offset,
  position,
  triangleBorderWidth,
}: {
  cornerTriangle?: boolean;
  hasBorder?: boolean;
  isBorder?: boolean;
  offset?: PositionOffset;
  position: AnyPosition;
  triangleBorderWidth?: number;
}) => {
  const triangleStyle: React.CSSProperties = {
    zIndex: isBorder ? 1 : 2,
  };

  // adjust the triangle to remove any offset added to the tooltip
  if (['top-left', 'bottom-left'].includes(position)) {
    triangleStyle.right = offset?.right ? -1 * offset.right : undefined;
  } else if (['top-right', 'bottom-right'].includes(position)) {
    triangleStyle.left = offset?.left ? -1 * offset.left : undefined;
  } else if (['left-top', 'right-top'].includes(position) && !cornerTriangle) {
    triangleStyle.top = offset?.top ? -1 * offset.top : undefined;
  } else if (['left-bottom', 'right-bottom'].includes(position) && !cornerTriangle) {
    triangleStyle.bottom = offset?.bottom ? -1 * offset.bottom : undefined;
  }

  // adjust the triangle to create the border effect
  if (hasBorder && triangleBorderWidth) {
    if (['bottom-left', 'bottom-center', 'bottom-right'].includes(position)) {
      triangleStyle.top = isBorder ? 0 : triangleBorderWidth;
    } else if (['top-left', 'top-center', 'top-right'].includes(position)) {
      triangleStyle.bottom = isBorder ? 0 : triangleBorderWidth;
    } else if (['left-top', 'left-center', 'left-bottom'].includes(position)) {
      triangleStyle.right = isBorder ? 0 : triangleBorderWidth;
    } else if (['right-top', 'right-center', 'right-bottom'].includes(position)) {
      triangleStyle.left = isBorder ? 0 : triangleBorderWidth;
    }

    if (cornerTriangle) {
      if (['left-top', 'right-top'].includes(position) && !isBorder) {
        triangleStyle.top = triangleBorderWidth;
      } else if (['left-bottom', 'right-bottom'].includes(position) && !isBorder) {
        triangleStyle.bottom = triangleBorderWidth;
      }
    }
  }

  return triangleStyle;
};

/**
 * The tooltip content is used to wrap the children of a
 * tooltip with an arrow pointing towards the toggler.
 *
 * This uses the Triangle component.
 */
export function TooltipContent({
  children,
  className,
  cornerTriangle = false,
  layout,
  offset,
  position = 'top-center',
  style,
  triangleBorderColor,
  triangleBorderWidth = 1,
  triangleColor,
  triangleSize,
  ...props
}: TooltipContentProps): JSX.Element | null {
  return position ? (
    <div
      className={cx(
        styles.tooltipContent,
        styles[`tooltipContent--${lowerCamelize(position)}`],
        cornerTriangle && styles['tooltipContent--cornerTriangle'],
        className,
      )}
      style={
        {
          '--triangle-size': `${getTriangleSize({ baseSize: triangleSize, cornerTriangle, position })}px`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {triangleBorderColor && (
        <Triangle
          className={cx(styles.tooltipContent__triangle)}
          color={triangleBorderColor}
          position={getTrianglePosition(position, cornerTriangle)}
          size={getTriangleSize({
            baseSize: triangleSize,
            cornerTriangle,
            position,
          })}
          style={getTriangleStyle({
            cornerTriangle,
            hasBorder: true,
            isBorder: true,
            offset,
            position,
            triangleBorderWidth,
          })}
        />
      )}

      <Triangle
        className={cx(styles.tooltipContent__triangle)}
        color={triangleColor}
        position={getTrianglePosition(position, cornerTriangle)}
        size={getTriangleSize({ baseSize: triangleSize, cornerTriangle, position })}
        style={getTriangleStyle({
          cornerTriangle,
          hasBorder: !!triangleBorderColor,
          offset,
          position,
          triangleBorderWidth,
        })}
      />

      {children}
    </div>
  ) : null;
}

TooltipContent.displayName = 'TooltipContent';
