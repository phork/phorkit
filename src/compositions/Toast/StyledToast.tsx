import React from 'react';
import { Toast, ToastProps } from './Toast';

export type StyledToastProps = Omit<ToastProps, 'level' | 'themeId'> & {
  levelColor: string;
  levelInverseColor: string;
};

/**
 * A styled toast is an extension of the `Toast`
 * component that will have a custom background
 * and text color.
 */
export const StyledToast = ({ levelColor, levelInverseColor, style, ...props }: StyledToastProps) => {
  return (
    <Toast
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
import { Toast, ToastProps } from './Toast';

export type StyledToastProps = Omit<ToastProps, 'level' | 'themeId'> & {
  levelColor: string;
  levelInverseColor: string;
}

export const StyledToast = styled(Toast, {
  shouldForwardProp: (prop: string) => !['levelColor', 'levelInverseColor'].includes(prop),
})<StyledToastProps>`
  ${({ levelColor }) => levelColor && `--toast-level-color: ${levelColor};`}
  ${({ levelInverseColor }) => levelInverseColor && `--toast-level-inverse-color: ${levelInverseColor};`}
`;

StyledToast.defaultProps = {
  unthemed: true,
};
*/

StyledToast.displayName = 'StyledToast';
