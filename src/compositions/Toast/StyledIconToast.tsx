import React from 'react';
import { IconToast, IconToastProps } from './IconToast';

export type StyledIconToastProps = Omit<IconToastProps, 'level' | 'themeId'> & {
  levelColor: string;
  levelInverseColor: string;
};

/**
 * A styled icon toast is an extension of the
 * `IconToast` component that will have a custom
 * background and text color.
 */
export const StyledIconToast = ({ levelColor, levelInverseColor, style, ...props }: StyledIconToastProps) => {
  return (
    <IconToast
      {...props}
      unthemed
      style={
        {
          '--toast-level-color': levelColor,
          '--toast-level-inverse-color': levelInverseColor,
          ...style,
        } as React.CSSProperties
      }
    />
  );
};

/* [TODO:dep] something in emotion causes infinite loops in production
import styled from '@emotion/styled';
import { IconToast, IconToastProps } from './IconToast';

export type StyledIconToastProps = Omit<IconToastProps, 'level' | 'themeId'> & {
  levelColor: string;
  levelInverseColor: string;
}

export const StyledIconToast = styled(IconToast, {
  shouldForwardProp: (prop: string) => !['levelColor', 'levelInverseColor'].includes(prop),
})<StyledIconToastProps>`
  ${({ levelColor }) => levelColor && `--toast-level-color: ${levelColor};`}
  ${({ levelInverseColor }) => levelInverseColor && `--toast-level-inverse-color: ${levelInverseColor};`}
`;

StyledIconToast.defaultProps = {
  unthemed: true,
};
*/

StyledIconToast.displayName = 'StyledIconToast';
