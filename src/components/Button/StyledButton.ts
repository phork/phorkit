import styled from '@emotion/styled';
import { MergeProps } from '../../types';
import { Button, ButtonProps } from './Button';
import { ButtonElementType } from './types';

export type StyledButtonProps<T extends ButtonElementType = 'button'> = MergeProps<
  Omit<ButtonProps<T>, 'color' | 'contrast' | 'themeId'>,
  {
    primaryColor?: string;
    inverseColor?: string;
    hoveredPrimaryColor?: string;
    activePrimaryColor?: string;
    width: number | string;
  }
>;

/**
 * A styled button is an extension of the `Button`
 * component that will have a custom background
 * and text color.
 */
export const StyledButton = styled(Button, {
  shouldForwardProp: (prop: string) =>
    !['primaryColor', 'inverseColor', 'hoveredPrimaryColor', 'activePrimaryColor', 'width'].includes(prop),
})<StyledButtonProps>`
  ${({ primaryColor }) => primaryColor && `--button-primary-color: ${primaryColor};`}
  ${({ inverseColor }) => inverseColor && `--button-inverse-color: ${inverseColor};`}
  ${({ hoveredPrimaryColor }) => hoveredPrimaryColor && `--button-hovered-primary-color: ${hoveredPrimaryColor};`}
  ${({ activePrimaryColor }) => activePrimaryColor && `--button-active-primary-color: ${activePrimaryColor};`}
  ${({ width }) => width !== undefined && `width: ${Number.isNaN(Number(width)) ? width : `${width}px`};`}
`;

StyledButton.displayName = 'StyledButton';

StyledButton.defaultProps = {
  unthemed: true,
};
