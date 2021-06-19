import styled from '@emotion/styled';
import { MergeProps } from '../../types';
import { IconButton, IconButtonElementType, IconButtonProps } from './IconButton';

export type StyledIconButtonProps<T extends IconButtonElementType = 'button'> = MergeProps<
  Omit<IconButtonProps<T>, 'width'>,
  {
    primaryColor?: string;
    inverseColor?: string;
    hoveredPrimaryColor?: string;
    activePrimaryColor?: string;
    width: number | string;
  }
>;

// @ts-ignore [TODO:ts] WTF
export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop: string) =>
    !['primaryColor', 'inverseColor', 'hoveredPrimaryColor', 'activePrimaryColor', 'width'].includes(prop),
})<StyledIconButtonProps>`
  ${({ primaryColor }) => primaryColor && `--button-primary-color: ${primaryColor};`}
  ${({ inverseColor }) => inverseColor && `--button-inverse-color: ${inverseColor};`}
  ${({ hoveredPrimaryColor }) => hoveredPrimaryColor && `--button-hovered-primary-color: ${hoveredPrimaryColor};`}
  ${({ activePrimaryColor }) => activePrimaryColor && `--button-active-primary-color: ${activePrimaryColor};`}
  ${({ width }) => width !== undefined && `width: ${Number.isNaN(width) ? width : `${width}px`};`}
`;

StyledIconButton.displayName = 'StyledIconButton';
