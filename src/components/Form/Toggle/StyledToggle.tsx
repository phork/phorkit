import styled from '@emotion/styled';
import React from 'react';
import { Toggle, ToggleProps } from './Toggle';

export type StyledToggleProps = Omit<ToggleProps, 'contrast' | 'themeId'> & {
  // colors
  backgroundColor: string;
  buttonBackgroundColor: string;
  checkedBackgroundColor: string;
  checkedButtonBackgroundColor: string;
  checkedHoveredFocusRingColor: string;
  hoveredFocusRingColor: string;
  checkedHoveredFocusRingOpacity?: number;

  // sizes
  toggleWidth?: number;
  toggleHeight?: number;
  toggleBorderWidth?: number;
  toggleFocusRingSize?: number;
  toggleLabelTopMargin?: number;

  // shape
  toggleBorderRadius?: number;
  toggleButtonBorderRadius?: number;
};

const BaseStyledToggle = styled(Toggle, {
  shouldForwardProp: (prop: string) =>
    ![
      'backgroundColor',
      'buttonBackgroundColor',
      'checkedBackgroundColor',
      'checkedButtonBackgroundColor',
      'checkedHoveredFocusRingColor',
      'hoveredFocusRingColor',
      'checkedHoveredFocusRingOpacity',
      'toggleWidth',
      'toggleHeight',
      'toggleBorderWidth',
      'toggleFocusRingSize',
      'toggleLabelTopMargin',
      'toggleBorderRadius',
      'toggleButtonBorderRadius',
    ].includes(prop),
})<StyledToggleProps>`
  ${({ backgroundColor }) => backgroundColor && `--toggle-background-color: ${backgroundColor};`}
  ${({ buttonBackgroundColor }) =>
    buttonBackgroundColor && `--toggle-button-background-color: ${buttonBackgroundColor};`}
  ${({ hoveredFocusRingColor }) =>
    hoveredFocusRingColor && `--toggle-unchecked-hovered-focus-ring-color: ${hoveredFocusRingColor};`}
  ${({ checkedBackgroundColor }) =>
    checkedBackgroundColor && `--toggle-checked-background-color: ${checkedBackgroundColor};`}
  ${({ checkedButtonBackgroundColor }) =>
    checkedButtonBackgroundColor && `--toggle-checked-button-background-color: ${checkedButtonBackgroundColor};`}
  ${({ checkedHoveredFocusRingColor }) =>
    checkedHoveredFocusRingColor && `--toggle-checked-hovered-focus-ring-color: ${checkedHoveredFocusRingColor};`}
  ${({ checkedHoveredFocusRingOpacity }) =>
    checkedHoveredFocusRingOpacity && `--toggle-checked-hovered-focus-ring-opacity: ${checkedHoveredFocusRingOpacity};`}

  ${({ toggleWidth }) => toggleWidth && `--toggle-width: ${toggleWidth}px;`}
  ${({ toggleHeight }) => toggleHeight && `--toggle-height: ${toggleHeight}px;`}
  ${({ toggleBorderWidth }) => toggleBorderWidth && `--toggle-border-width: ${toggleBorderWidth}px;`}
  ${({ toggleFocusRingSize }) => toggleFocusRingSize && `--toggle-focus-ring-size: ${toggleFocusRingSize}px;`}
  ${({ toggleLabelTopMargin }) => toggleLabelTopMargin && `--toggle-label-top-margin: ${toggleLabelTopMargin}px;`}

  ${({ toggleBorderRadius }) => toggleBorderRadius && `--toggle-border-radius: ${toggleBorderRadius}px;`}
  ${({ toggleButtonBorderRadius }) =>
    toggleButtonBorderRadius && `--toggle-button-border-radius: ${toggleButtonBorderRadius}px;`}
`;

/**
 * A styled toggle is an extension of the `Toggle` component
 * that will have a custom background and button color.
 */
export const StyledToggle = (props: StyledToggleProps) => <BaseStyledToggle {...props} unthemed />;

StyledToggle.displayName = 'StyledToggle';
