import styled from '@emotion/styled';
import { MergeProps } from '../../types';
import { Button, ButtonElementType, ButtonProps } from './Button';

export type StyledButtonProps<T extends ButtonElementType = 'button'> = MergeProps<
  Omit<ButtonProps<T>, 'width'>,
  {
    primaryColor?: string;
    inverseColor?: string;
    hoverPrimaryColor?: string;
    activePrimaryColor?: string;
    width: number | string;
  }
>;

// @ts-ignore [TODO:ts] WTF
export const StyledButton = styled(Button, {
  shouldForwardProp: (prop: string) =>
    !['primaryColor', 'inverseColor', 'hoverPrimaryColor', 'activePrimaryColor', 'width'].includes(prop),
})<StyledButtonProps>`
  ${({ primaryColor }) => primaryColor && `--button-primary-color: ${primaryColor};`}
  ${({ inverseColor }) => inverseColor && `--button-inverse-color: ${inverseColor};`}
  ${({ hoverPrimaryColor }) => hoverPrimaryColor && `--button-hover-primary-color: ${hoverPrimaryColor};`}
  ${({ activePrimaryColor }) => activePrimaryColor && `--button-active-primary-color: ${activePrimaryColor};`}
  ${({ width }) => width !== undefined && `width: ${Number.isNaN(width) ? width : `${width}px`};`}
`;

StyledButton.displayName = 'StyledButton';
