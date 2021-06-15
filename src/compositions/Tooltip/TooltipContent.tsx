import { cx } from '@emotion/css';
import React from 'react';
import { CornerPosition, SimplePosition, AnyPosition, Orientation } from '../../types';
import { lowerCamelize } from '../../utils/case';
import { PositionOffset } from '../../utils/getPositionOffset';
import { Triangle } from '../../components/Triangle/Triangle';
import styles from './styles/Tooltip.module.css';

export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  layout?: Orientation;
  offset: PositionOffset;
  position?: AnyPosition;
  triangleBorderColor?: string;
  triangleBorderWidth?: number;
  triangleColor: string;
  triangleSize?: number;
}

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

const getTriangleSize = ({
  baseSize,
  triangleBorderWidth,
  isBorder,
  position,
}: {
  baseSize?: number;
  triangleBorderWidth?: number;
  isBorder?: boolean;
  position: AnyPosition;
}) => {
  const trianglePosition = getTrianglePosition(position);
  if (trianglePosition && ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(trianglePosition)) {
    return (baseSize || 6) + (isBorder && triangleBorderWidth ? triangleBorderWidth : 0);
  }
  return (baseSize || 8) + (isBorder && triangleBorderWidth ? triangleBorderWidth * 2 : 0);
};

const getTriangleStyle = ({
  triangleBorderWidth,
  hasBorder,
  isBorder,
  offset,
  position,
}: {
  triangleBorderWidth?: number;
  hasBorder?: boolean;
  isBorder?: boolean;
  offset?: PositionOffset;
  position: AnyPosition;
}) => {
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
  if (hasBorder && triangleBorderWidth) {
    if (['bottom-left', 'bottom-center', 'bottom-right'].includes(position)) {
      triangleStyle.top = isBorder ? -triangleBorderWidth : triangleBorderWidth;
    } else if (['top-left', 'top-center', 'top-right'].includes(position)) {
      triangleStyle.bottom = isBorder ? -triangleBorderWidth : triangleBorderWidth;
    } else if (['left-top', 'left-center', 'left-bottom'].includes(position)) {
      triangleStyle.right = isBorder ? -triangleBorderWidth : triangleBorderWidth;
    } else if (['right-top', 'right-center', 'right-bottom'].includes(position)) {
      triangleStyle.left = isBorder ? -triangleBorderWidth : triangleBorderWidth;
    }

    if (['left-top', 'right-top'].includes(position) && !isBorder) {
      triangleStyle.top = triangleBorderWidth;
    } else if (['left-bottom', 'right-bottom'].includes(position) && !isBorder) {
      triangleStyle.bottom = triangleBorderWidth;
    }
  }

  return triangleStyle;
};

export function TooltipContent({
  children,
  className,
  layout,
  offset,
  position = 'top-center',
  style,
  triangleBorderColor,
  triangleBorderWidth = 1,
  triangleColor,
  triangleSize,
  ...props
}: TooltipContentProps): React.ReactElement | null {
  return position ? (
    <div
      className={cx(styles.tooltip, styles[`tooltip--${lowerCamelize(position)}`], className)}
      style={
        {
          '--triangle-size': `${getTriangleSize({ baseSize: triangleSize, position })}px`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {triangleBorderColor && (
        <Triangle
          className={cx(styles.tooltip__triangle)}
          color={triangleBorderColor}
          position={getTrianglePosition(position)}
          size={getTriangleSize({ baseSize: triangleSize, position, triangleBorderWidth, isBorder: true })}
          style={getTriangleStyle({ position, offset, triangleBorderWidth, hasBorder: true, isBorder: true })}
        />
      )}

      <Triangle
        className={cx(styles.tooltip__triangle)}
        color={triangleColor}
        position={getTrianglePosition(position)}
        size={getTriangleSize({ baseSize: triangleSize, position, triangleBorderWidth })}
        style={getTriangleStyle({ position, offset, hasBorder: !!triangleBorderColor, triangleBorderWidth })}
      />

      {children}
    </div>
  ) : null;
}

TooltipContent.displayName = 'TooltipContent';
