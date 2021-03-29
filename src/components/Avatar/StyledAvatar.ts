import styled from '@emotion/styled';
import { Avatar, AvatarProps } from './Avatar';

export interface StyledAvatarProps extends AvatarProps {
  backgroundColor?: string;
  textColor?: string;
}

export const StyledAvatar = styled(Avatar, {
  shouldForwardProp: (prop: string) => !['backgroundColor', 'textColor', 'themeId'].includes(prop),
})<StyledAvatarProps>`
  ${({ backgroundColor }) => backgroundColor && `--avatar-background-color: ${backgroundColor};`}
  ${({ textColor }) => textColor && `--avatar-text-color: ${textColor};`}
`;
