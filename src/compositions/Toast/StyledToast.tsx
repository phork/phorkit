import React from 'react';
import { Toast, ToastProps } from './Toast';

export interface StyledToastProps extends Omit<ToastProps, 'level'> {
  levelColor?: string;
  levelInverseColor?: string;
}

export const StyledToast = ({ levelColor, levelInverseColor, ...props }: StyledToastProps) => {
  return (
    <Toast
      {...props}
      level="custom"
      style={
        {
          '--toast-level-color': levelColor,
          '--toast-level-inverse-color': levelInverseColor,
        } as React.CSSProperties
      }
    />
  );
};

/* [TODO:dep] something in emotion causes infinite loops in production
import styled from '@emotion/styled';
import { Toast, ToastProps } from './Toast';

export interface StyledToastProps extends Omit<ToastProps, 'level'> {
  levelColor?: string;
  levelInverseColor?: string;
}

export const StyledToast = styled(Toast, {
  shouldForwardProp: (prop: string) => !['levelColor', 'levelInverseColor'].includes(prop),
})<StyledToastProps>`
  ${({ levelColor }) => levelColor && `--toast-level-color: ${levelColor};`}
  ${({ levelInverseColor }) => levelInverseColor && `--toast-level-inverse-color: ${levelInverseColor};`}
`;

StyledToast.defaultProps = {
  level: 'custom',
};
*/

StyledToast.displayName = 'StyledToast';
