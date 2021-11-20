import React from 'react';
import { CornerPosition, SimplePosition } from '../../types';
import { lowerCamelize } from '../../utils/case';

export type TriangleProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  color?: string;
  position: CornerPosition | SimplePosition;
  size?: number | string;
  style?: React.CSSProperties;
};

type PositionCallback = (props: Required<Pick<TriangleProps, 'size' | 'color'>>) => {
  borderBottom?: string;
  borderLeft?: string;
  borderRight?: string;
  borderTop?: string;
};

const formatSize = (size: number | string) => (typeof size === 'number' ? `${size}px` : size);

const styles: Record<string, PositionCallback> = {
  bottomLeft: props => ({
    borderBottom: `${formatSize(props.size)} solid ${props.color}`,
    borderLeft: `${formatSize(props.size)} solid ${props.color}`,
    borderRight: `${formatSize(props.size)} solid transparent`,
    borderTop: `${formatSize(props.size)} solid transparent`,
  }),
  bottomRight: props => ({
    borderBottom: `${formatSize(props.size)} solid ${props.color}`,
    borderLeft: `${formatSize(props.size)} solid transparent`,
    borderRight: `${formatSize(props.size)} solid ${props.color}`,
    borderTop: `${formatSize(props.size)} solid transparent`,
  }),
  bottom: props => ({
    borderLeft: `${formatSize(props.size)} solid transparent`,
    borderRight: `${formatSize(props.size)} solid transparent`,
    borderTop: `${formatSize(props.size)} solid ${props.color}`,
  }),
  left: props => ({
    borderBottom: `${formatSize(props.size)} solid transparent`,
    borderRight: `${formatSize(props.size)} solid ${props.color}`,
    borderTop: `${formatSize(props.size)} solid transparent`,
  }),
  right: props => ({
    borderBottom: `${formatSize(props.size)} solid transparent`,
    borderLeft: `${formatSize(props.size)} solid ${props.color}`,
    borderTop: `${formatSize(props.size)} solid transparent`,
  }),
  topLeft: props => ({
    borderBottom: `${formatSize(props.size)} solid transparent`,
    borderLeft: `${formatSize(props.size)} solid ${props.color}`,
    borderRight: `${formatSize(props.size)} solid transparent`,
    borderTop: `${formatSize(props.size)} solid ${props.color}`,
  }),
  topRight: props => ({
    borderBottom: `${formatSize(props.size)} solid transparent`,
    borderLeft: `${formatSize(props.size)} solid transparent`,
    borderRight: `${formatSize(props.size)} solid ${props.color}`,
    borderTop: `${formatSize(props.size)} solid ${props.color}`,
  }),
  top: props => ({
    borderBottom: `${formatSize(props.size)} solid ${props.color}`,
    borderLeft: `${formatSize(props.size)} solid transparent`,
    borderRight: `${formatSize(props.size)} solid transparent`,
  }),
};

/**
 * A triangle is used as a tail (arrow) for things
 * like popovers and tooltips. It points to the
 * element that the popover relates to. Triangles
 * can be rendered like a corner (eg. top-left) or
 * can be rendered along an edge (eg. top).
 */
export const Triangle = ({
  color = 'var(--triangle-color)',
  position,
  size = 'var(--triangle-size)',
  style,
  ...props
}: TriangleProps): JSX.Element => (
  <div
    style={{
      width: 0,
      height: 0,
      ...styles[lowerCamelize(position)]({
        size,
        color,
      }),
      ...style,
    }}
    {...props}
  />
);

Triangle.displayName = 'Triangle';
