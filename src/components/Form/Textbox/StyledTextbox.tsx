import styled from '@emotion/styled';
import { Textbox, TextboxProps } from './Textbox';

export type StyledTextboxProps = Omit<TextboxProps, 'contrast' | 'themeId' | 'validity'> & {
  textboxIconColor: string;
  textboxIconHoveredColor: string;
  textboxInputContainerBackgroundColor: string;
  textboxInputContainerBorderColor: string;
  textboxInputContainerFocusedBorderColor: string;
  textboxInputContainerHoveredBorderColor: string;
  textboxInputTextColor: string;
  textboxLabelTextColor: string;
};

/**
 * A styled textbox is an extension of the `Textbox`
 * component which will have custom text, border and
 * background colors for the focused, unfocused and
 * hovered states.
 */
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
