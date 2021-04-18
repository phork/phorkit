import React from 'react';
import { IconToast, IconToastProps } from './IconToast';

export interface StyledIconToastProps extends Omit<IconToastProps, 'level'> {
  levelColor?: string;
  levelInverseColor?: string;
}

export const StyledIconToast = ({ levelColor, levelInverseColor, ...props }: StyledIconToastProps) => {
  return (
    <IconToast
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
import { IconToast, IconToastProps } from './IconToast';

export interface StyledIconToastProps extends IconToastProps {
  levelColor?: string;
  levelInverseColor?: string;
}

export const StyledIconToast = styled(IconToast, {
  shouldForwardProp: (prop: string) => !['levelColor', 'levelInverseColor'].includes(prop),
})<StyledIconToastProps>`
  ${({ levelColor }) => levelColor && `--toast-level-color: ${levelColor};`}
  ${({ levelInverseColor }) => levelInverseColor && `--toast-level-inverse-color: ${levelInverseColor};`}
`;

StyledIconToast.defaultProps = {
  level: 'custom',
};
*/
