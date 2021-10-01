import styled from '@emotion/styled';
import { Avatar, AvatarProps } from './Avatar';

export type StyledAvatarProps = AvatarProps & {
  backgroundColor: string;
  textColor: string;
};

/**
 * A styled avatar is an extension of the Avatar
 * component which, when viewed as initials, will
 * have a custom text and background color.
 */
export const StyledAvatar = styled(Avatar, {
  shouldForwardProp: (prop: string) => !['backgroundColor', 'textColor', 'themeId'].includes(prop),
})<StyledAvatarProps>`
  ${({ backgroundColor }) => backgroundColor && `--avatar-background-color: ${backgroundColor};`}
  ${({ textColor }) => textColor && `--avatar-text-color: ${textColor};`}
`;

StyledAvatar.displayName = 'StyledAvatar';
