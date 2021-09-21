import styled from '@emotion/styled';
import { Password, PasswordProps } from './Password';

export interface StyledPasswordProps extends PasswordProps {
  passwordIconColor: string;
  passwordIconHoveredColor: string;
  passwordInputContainerBackgroundColor: string;
  passwordInputContainerBorderColor: string;
  passwordInputContainerFocusedBorderColor: string;
  passwordInputContainerHoveredBorderColor: string;
  passwordInputTextColor: string;
  passwordLabelTextColor: string;
}

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
      'themeId',
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
