import styled from '@emotion/styled';
import { Password, PasswordProps } from './Password';

export type StyledPasswordProps = Omit<PasswordProps, 'contrast' | 'themeId' | 'validity'> & {
  passwordIconColor: string;
  passwordIconHoveredColor: string;
  passwordInputContainerBackgroundColor: string;
  passwordInputContainerBorderColor: string;
  passwordInputContainerFocusedBorderColor: string;
  passwordInputContainerHoveredBorderColor: string;
  passwordInputTextColor: string;
  passwordLabelTextColor: string;
};

/**
 * A styled password is an extension of the `Password`
 * component which will have custom text, border and
 * background colors for the focused, unfocused and
 * hovered states.
 */
export const StyledPassword = styled(Password, {
  shouldForwardProp: (prop: string) =>
    ![
      'passwordIconColor',
      'passwordIconHoveredColor',
      'passwordInputContainerBackgroundColor',
      'passwordInputContainerBorderColor',
      'passwordInputContainerFocusedBorderColor',
      'passwordInputContainerHoveredBorderColor',
      'passwordInputTextColor',
      'passwordLabelTextColor',
    ].includes(prop),
})<StyledPasswordProps>`
  ${({ passwordIconColor }) => passwordIconColor && `--formbox-icon-color: ${passwordIconColor};`}
  ${({ passwordIconHoveredColor }) =>
    passwordIconHoveredColor && `--formbox-icon-hovered-color: ${passwordIconHoveredColor};`}
  ${({ passwordInputContainerBackgroundColor }) =>
    passwordInputContainerBackgroundColor &&
    `--formbox-input-container-background-color: ${passwordInputContainerBackgroundColor};`}
  ${({ passwordInputContainerBorderColor }) =>
    passwordInputContainerBorderColor &&
    `--formbox-input-container-border-color: ${passwordInputContainerBorderColor};`}
  ${({ passwordInputContainerFocusedBorderColor }) =>
    passwordInputContainerFocusedBorderColor &&
    `--formbox-input-container-focused-border-color: ${passwordInputContainerFocusedBorderColor};`}
  ${({ passwordInputContainerHoveredBorderColor }) =>
    passwordInputContainerHoveredBorderColor &&
    `--formbox-input-container-hovered-border-color: ${passwordInputContainerHoveredBorderColor};`}
  ${({ passwordInputTextColor }) => passwordInputTextColor && `--formbox-input-text-color: ${passwordInputTextColor};`}
  ${({ passwordLabelTextColor }) => passwordLabelTextColor && `--formbox-label-text-color: ${passwordLabelTextColor};`}
`;

StyledPassword.displayName = 'StyledPassword';

StyledPassword.defaultProps = {
  unthemed: true,
};
