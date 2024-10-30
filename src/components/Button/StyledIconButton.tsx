import styled from '@emotion/styled';
import React from 'react';
import { MergeProps } from '../../types';
import { IconButton, IconButtonElementType, IconButtonProps } from './IconButton';

export type StyledIconButtonProps<T extends IconButtonElementType = 'button'> = MergeProps<
  Omit<IconButtonProps<T>, 'color' | 'contrast' | 'themeId'>,
  {
    primaryColor?: string;
    inverseColor?: string;
    hoveredPrimaryColor?: string;
    activePrimaryColor?: string;
    width?: number | string;
  }
>;

const BaseStyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop: string) =>
    !['primaryColor', 'inverseColor', 'hoveredPrimaryColor', 'activePrimaryColor', 'width'].includes(prop),
})<StyledIconButtonProps>`
  ${({ primaryColor }) => primaryColor && `--button-primary-color: ${primaryColor};`}
  ${({ inverseColor }) => inverseColor && `--button-inverse-color: ${inverseColor};`}
  ${({ hoveredPrimaryColor }) => hoveredPrimaryColor && `--button-hovered-primary-color: ${hoveredPrimaryColor};`}
  ${({ activePrimaryColor }) => activePrimaryColor && `--button-active-primary-color: ${activePrimaryColor};`}
  ${({ width }) => width !== undefined && `width: ${Number.isNaN(Number(width)) ? width : `${width}px`};`}
`;

/**
 * A styled icon button is an extension of the
 * `IconButton` component that will have a custom
 * text and background color.
 */
export const StyledIconButton = (props: StyledIconButtonProps) => <BaseStyledIconButton {...props} unthemed />;

StyledIconButton.displayName = 'StyledIconButton';
