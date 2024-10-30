import styled from '@emotion/styled';
import React from 'react';
import { MergeProps } from '../../types';
import { IconTextButton, IconTextButtonElementType, IconTextButtonProps } from './IconTextButton';

export type StyledIconTextButtonProps<T extends IconTextButtonElementType = 'button'> = MergeProps<
  Omit<IconTextButtonProps<T>, 'color' | 'contrast' | 'themeId'>,
  {
    primaryColor?: string;
    inverseColor?: string;
    hoveredPrimaryColor?: string;
    activePrimaryColor?: string;
    width?: number | string;
  }
>;

const BaseStyledIconTextButton = styled(IconTextButton, {
  shouldForwardProp: (prop: string) =>
    !['primaryColor', 'inverseColor', 'hoveredPrimaryColor', 'activePrimaryColor', 'width'].includes(prop),
})<StyledIconTextButtonProps>`
  ${({ primaryColor }) => primaryColor && `--button-primary-color: ${primaryColor};`}
  ${({ inverseColor }) => inverseColor && `--button-inverse-color: ${inverseColor};`}
  ${({ hoveredPrimaryColor }) => hoveredPrimaryColor && `--button-hovered-primary-color: ${hoveredPrimaryColor};`}
  ${({ activePrimaryColor }) => activePrimaryColor && `--button-active-primary-color: ${activePrimaryColor};`}
  ${({ width }) => width !== undefined && `width: ${Number.isNaN(Number(width)) ? width : `${width}px`};`}
`;

/**
 * A styled icon text button is an extension of
 * the `IconTextButton` component that will have a
 * custom text and background color.
 */
export const StyledIconTextButton = (props: StyledIconTextButtonProps) => (
  <BaseStyledIconTextButton {...props} unthemed />
);

StyledIconTextButton.displayName = 'StyledIconTextButton';
