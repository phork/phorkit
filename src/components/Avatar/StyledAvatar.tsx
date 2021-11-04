import styled from '@emotion/styled';
import { Avatar, AvatarProps } from './Avatar';

export type StyledAvatarProps<T extends React.ElementType = 'div'> = Omit<
  AvatarProps<T>,
  'color' | 'contrast' | 'themeId'
> & {
  backgroundColor: string;
  textColor: string;
};

/**
 * A styled avatar is an extension of the `Avatar`
 * component which, when viewed as initials, will
 * have a custom text and background color.
 */
export const StyledAvatar = styled(Avatar, {
  shouldForwardProp: (prop: string) => !['backgroundColor', 'textColor'].includes(prop),
})<StyledAvatarProps>`
  ${({ backgroundColor }) => backgroundColor && `--avatar-background-color: ${backgroundColor};`}
  ${({ textColor }) => textColor && `--avatar-text-color: ${textColor};`}
` as <T extends React.ElementType = 'div'>(p: StyledAvatarProps<T>) => React.ReactElement<T>;

(StyledAvatar as React.NamedExoticComponent).displayName = 'StyledAvatar';
