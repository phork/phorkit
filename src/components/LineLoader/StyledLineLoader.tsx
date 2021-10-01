import React from 'react';
import { LineLoader, LineLoaderProps } from './LineLoader';

export type StyledLineLoaderProps = Omit<LineLoaderProps, 'color'> & {
  color: string;
};

/**
 * A styled line load is an extension of the
 * LineLoader component and it will have a
 * custom color.
 */
export const StyledLineLoader = ({ color, style, ...props }: StyledLineLoaderProps) => {
  return (
    <LineLoader
      {...props}
      unthemed
      style={
        {
          '--line-loader-color': color,
          ...style,
        } as React.CSSProperties
      }
    />
  );
};

/* [TODO:dep] something in emotion causes infinite loops in production
import styled from '@emotion/styled';
import { LineLoader, LineLoaderProps } from './LineLoader';

export type StyledLineLoaderProps = Omit<LineLoaderProps, 'color'> & {
  color: string;
}

export const StyledLineLoader = styled(LineLoader, {
  shouldForwardProp: (prop: string) => !['color', 'themeId'].includes(prop),
})<StyledLineLoaderProps>`
  ${({ color }) => color && `--line-loader-color: ${color};`}
`;

StyledLineLoader.defaultProps = {
  unthemed: true,
};
*/

StyledLineLoader.displayName = 'StyledLineLoader';
