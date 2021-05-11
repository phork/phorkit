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
  triangleColor: string;
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
  borderWidth,
  isBorder,
  position,
}: {
  borderWidth?: number;
  isBorder?: boolean;
  position: AnyPosition;
}) => {
  const trianglePosition = getTrianglePosition(position);
  if (trianglePosition && ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(trianglePosition)) {
    return 6 + (isBorder && borderWidth ? borderWidth : 0);
  }
  return 8 + (isBorder && borderWidth ? borderWidth * 2 : 0);
};

const getTriangleStyle = ({
  borderWidth,
  hasBorder,
  isBorder,
  offset,
  position,
}: {
  borderWidth?: number;
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
  if (hasBorder && borderWidth) {
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

export function TooltipContent({
  children,
  className,
  layout,
  offset,
  position = 'top-center',
  style,
  triangleBorderColor,
  triangleColor,
  ...props
}: TooltipContentProps): React.ReactElement | null {
  const borderWidth = 1;

  return position ? (
    <div
      className={cx(styles.tooltip, styles[`tooltip--${lowerCamelize(position)}`], className)}
      style={
        {
          '--triangle-size': `${getTriangleSize({ position })}px`,
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
          size={getTriangleSize({ position, borderWidth, isBorder: true })}
          style={getTriangleStyle({ position, offset, borderWidth, hasBorder: true, isBorder: true })}
        />
      )}

      <Triangle
        className={cx(styles.tooltip__triangle)}
        color={triangleColor}
        position={getTrianglePosition(position)}
        size={getTriangleSize({ position, borderWidth })}
        style={getTriangleStyle({ position, offset, hasBorder: !!triangleBorderColor, borderWidth })}
      />

      {children}
    </div>
  ) : null;
}

TooltipContent.displayName = 'TooltipContent';
