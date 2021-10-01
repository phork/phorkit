import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { Badge, BadgeProps } from './Badge';

export type ColoredBadgeProps = Omit<BadgeProps, 'themeId'> & {
  colorId: ThemeColorIds;
  themeId: Theme;
};

// [TODO:ts] revisit casting
const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop: string): boolean => !['colorId', 'themeId', 'variant'].includes(prop),
})<ColoredBadgeProps>`
  --badge-background-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --badge-text-color: ${props => themes[props.themeId][`color-${props.colorId}-contrast` as keyof ThemeColors]};
`;

/**
 * A colored badge is an extension of the Badge
 * component and it will have a background of one
 * of the theme's primary colors.
 */
export const ColoredBadge = React.memo<ColoredBadgeProps>(withTheme<ColoredBadgeProps>(StyledBadge));
ColoredBadge.displayName = 'ColoredBadge';

StyledBadge.defaultProps = {
  unthemed: true,
};
