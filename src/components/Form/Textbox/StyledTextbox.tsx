import styled from '@emotion/styled';
import { Textbox, TextboxProps } from './Textbox';

export interface StyledTextboxProps extends TextboxProps {
  textboxIconColor: string;
  textboxIconHoveredColor: string;
  textboxInputContainerBackgroundColor: string;
  textboxInputContainerBorderColor: string;
  textboxInputContainerFocusedBorderColor: string;
  textboxInputContainerHoveredBorderColor: string;
  textboxInputTextColor: string;
  textboxLabelTextColor: string;
}

export const StyledTextbox = styled(Textbox, {
  shouldForwardProp: (prop: string) =>
    ![
      'textboxIconColor',
      'textboxIconHoveredColor',
      'textboxInputContainerBackgroundColor',
      'textboxInputContainerBorderColor',
      'textboxInputContainerFocusedBorderColor',
      'textboxInputContainerHoveredBorderColor',
      'textboxInputTextColor',
      'textboxLabelTextColor',
      'themeId',
    ].includes(prop),
})<StyledTextboxProps>`
  ${({ textboxIconColor }) => textboxIconColor && `--formbox-icon-color: ${textboxIconColor};`}
  ${({ textboxIconHoveredColor }) =>
    textboxIconHoveredColor && `--formbox-icon-hovered-color: ${textboxIconHoveredColor};`}
  ${({ textboxInputContainerBackgroundColor }) =>
    textboxInputContainerBackgroundColor &&
    `--formbox-input-container-background-color: ${textboxInputContainerBackgroundColor};`}
  ${({ textboxInputContainerBorderColor }) =>
    textboxInputContainerBorderColor && `--formbox-input-container-border-color: ${textboxInputContainerBorderColor};`}
  ${({ textboxInputContainerFocusedBorderColor }) =>
    textboxInputContainerFocusedBorderColor &&
    `--formbox-input-container-focused-border-color: ${textboxInputContainerFocusedBorderColor};`}
  ${({ textboxInputContainerHoveredBorderColor }) =>
    textboxInputContainerHoveredBorderColor &&
    `--formbox-input-container-hovered-border-color: ${textboxInputContainerHoveredBorderColor};`}
  ${({ textboxInputTextColor }) => textboxInputTextColor && `--formbox-input-text-color: ${textboxInputTextColor};`}
  ${({ textboxLabelTextColor }) => textboxLabelTextColor && `--formbox-label-text-color: ${textboxLabelTextColor};`}
`;

StyledTextbox.displayName = 'StyledTextbox';

StyledTextbox.defaultProps = {
  unthemed: true,
};
