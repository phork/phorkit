import styled from '@emotion/styled';
import { MergeProps } from '../../types';
import { IconTextButton, IconTextButtonElementType, IconTextButtonProps } from './IconTextButton';

export type StyledIconTextButtonProps<T extends IconTextButtonElementType = 'button'> = MergeProps<
  Omit<IconTextButtonProps<T>, 'width'>,
  {
    primaryColor?: string;
    inverseColor?: string;
    hoveredPrimaryColor?: string;
    activePrimaryColor?: string;
    width: number | string;
  }
>;

// @ts-ignore [TODO:ts] WTF
export const StyledIconTextButton = styled(IconTextButton, {
  shouldForwardProp: (prop: string) =>
    !['primaryColor', 'inverseColor', 'hoveredPrimaryColor', 'activePrimaryColor', 'width'].includes(prop),
})<StyledIconTextButtonProps>`
  ${({ primaryColor }) => primaryColor && `--button-primary-color: ${primaryColor};`}
  ${({ inverseColor }) => inverseColor && `--button-inverse-color: ${inverseColor};`}
  ${({ hoveredPrimaryColor }) => hoveredPrimaryColor && `--button-hovered-primary-color: ${hoveredPrimaryColor};`}
  ${({ activePrimaryColor }) => activePrimaryColor && `--button-active-primary-color: ${activePrimaryColor};`}
  ${({ width }) => width !== undefined && `width: ${Number.isNaN(Number(width)) ? width : `${width}px`};`}
`;

StyledIconTextButton.displayName = 'StyledIconTextButton';
