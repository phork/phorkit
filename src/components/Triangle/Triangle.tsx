import React from 'react';
import { CornerPosition, SimplePosition } from '../../types';
import { lowerCamelize } from '../../utils/case';

export interface TriangleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  color?: string;
  position: CornerPosition | SimplePosition;
  size?: number | string;
  style?: React.CSSProperties;
}

type PositionCallback = (props: Required<Pick<TriangleProps, 'size' | 'color'>>) => {
  borderBottom?: string;
  borderLeft?: string;
  borderRight?: string;
  borderTop?: string;
};

const formatSize = (size: number | string) => (typeof size === 'number' ? `${size}px` : size);

const styles: Record<string, PositionCallback> = {
  bottomLeft: props => ({
    borderBottom: `solid ${formatSize(props.size)} ${props.color}`,
    borderLeft: `solid ${formatSize(props.size)} ${props.color}`,
    borderRight: `solid ${formatSize(props.size)} transparent`,
    borderTop: `solid ${formatSize(props.size)} transparent`,
  }),
  bottomRight: props => ({
    borderBottom: `solid ${formatSize(props.size)} ${props.color}`,
    borderLeft: `solid ${formatSize(props.size)} transparent`,
    borderRight: `solid ${formatSize(props.size)} ${props.color}`,
    borderTop: `solid ${formatSize(props.size)} transparent`,
  }),
  bottom: props => ({
    borderLeft: `solid ${formatSize(props.size)} transparent`,
    borderRight: `solid ${formatSize(props.size)} transparent`,
    borderTop: `solid ${formatSize(props.size)} ${props.color}`,
  }),
  left: props => ({
    borderBottom: `solid ${formatSize(props.size)} transparent`,
    borderRight: `solid ${formatSize(props.size)} ${props.color}`,
    borderTop: `solid ${formatSize(props.size)} transparent`,
  }),
  right: props => ({
    borderBottom: `solid ${formatSize(props.size)} transparent`,
    borderLeft: `solid ${formatSize(props.size)} ${props.color}`,
    borderTop: `solid ${formatSize(props.size)} transparent`,
  }),
  topLeft: props => ({
    borderBottom: `solid ${formatSize(props.size)} transparent`,
    borderLeft: `solid ${formatSize(props.size)} ${props.color}`,
    borderRight: `solid ${formatSize(props.size)} transparent`,
    borderTop: `solid ${formatSize(props.size)} ${props.color}`,
  }),
  topRight: props => ({
    borderBottom: `solid ${formatSize(props.size)} transparent`,
    borderLeft: `solid ${formatSize(props.size)} transparent`,
    borderRight: `solid ${formatSize(props.size)} ${props.color}`,
    borderTop: `solid ${formatSize(props.size)} ${props.color}`,
  }),
  top: props => ({
    borderBottom: `solid ${formatSize(props.size)} ${props.color}`,
    borderLeft: `solid ${formatSize(props.size)} transparent`,
    borderRight: `solid ${formatSize(props.size)} transparent`,
  }),
};

export const Triangle = ({
  color = 'var(--triangle-color)',
  position,
  size = 'var(--triangle-size',
  style,
  ...props
}: TriangleProps): React.ReactElement<TriangleProps, 'div'> => (
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
