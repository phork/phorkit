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
export const StyledToast = ({ levelColor, levelInverseColor, style, ...props }: StyledToastProps): JSX.Element => {
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

const BaseStyledToast = styled(Toast, {
  shouldForwardProp: (prop: string) => !['levelColor', 'levelInverseColor'].includes(prop),
})<StyledToastProps>`
  ${({ levelColor }) => levelColor && `--toast-level-color: ${levelColor};`}
  ${({ levelInverseColor }) => levelInverseColor && `--toast-level-inverse-color: ${levelInverseColor};`}
`;

export const StyledToast = (props: StyledToastProps) => <BaseStyledToast {...props} unthemed />;
*/

StyledToast.displayName = 'StyledToast';
