import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { Avatar, AvatarProps } from './Avatar';

export type ColoredAvatarProps<T extends React.ElementType = 'div'> = Omit<
  AvatarProps<T>,
  'color' | 'contrast' | 'themeId'
> & {
  colorId: ThemeColorIds;
  themeId: Theme;
};

// [TODO:ts] revisit casting
const StyledAvatar = styled(Avatar, {
  shouldForwardProp: (prop: string): boolean => prop !== 'colorId',
})<ColoredAvatarProps>`
  --avatar-background-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --avatar-text-color: ${props => themes[props.themeId][`color-${props.colorId}-contrast` as keyof ThemeColors]};
`;

/**
 * A colored avatar is an extension of the `Avatar`
 * component which, when viewed as initials, will
 * have a background of one of the theme's primary
 * colors.
 */
export const ColoredAvatar = withTheme<ColoredAvatarProps>(StyledAvatar) as <T extends React.ElementType = 'div'>(
  p: Omit<ColoredAvatarProps<T>, 'themeId'> & { themeId?: Theme },
) => React.ReactElement<T>;

(ColoredAvatar as React.NamedExoticComponent).displayName = 'ColoredAvatar';

StyledAvatar.defaultProps = {
  unthemed: true,
};
