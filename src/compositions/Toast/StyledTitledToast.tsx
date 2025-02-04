import React from 'react';
import { TitledToast, TitledToastProps } from './TitledToast';

export type StyledTitledToastProps = Omit<TitledToastProps, 'level' | 'themeId'> & {
  levelColor: string;
  levelInverseColor: string;
};

/**
 * A styled titled toast is an extension of the
 * `TitledToast` component that will have a custom
 * background and text color.
 */
export const StyledTitledToast = ({
  levelColor,
  levelInverseColor,
  style,
  ...props
}: StyledTitledToastProps): JSX.Element => {
  return (
    <TitledToast
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
import { TitledToast, TitledToastProps } from './TitledToast';

export type StyledTitledToastProps = Omit<TitledToastProps, 'level' | 'themeId'> & {
  levelColor: string;
  levelInverseColor: string;
}

const BaseStyledTitledToast = styled(TitledToast, {
  shouldForwardProp: (prop: string) => !['levelColor', 'levelInverseColor'].includes(prop),
})<StyledTitledToastProps>`
  ${({ levelColor }) => levelColor && `--toast-level-color: ${levelColor};`}
  ${({ levelInverseColor }) => levelInverseColor && `--toast-level-inverse-color: ${levelInverseColor};`}
`;

export const StyledTitledToast = (props: StyledTitledToastProps) => <BaseStyledTitledToast {...props} unthemed />;

*/

StyledTitledToast.displayName = 'StyledTitledToast';
