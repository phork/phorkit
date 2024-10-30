import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { Badge, BadgeProps } from './Badge';

export type ColoredBadgeProps = Omit<BadgeProps, 'color' | 'contrast' | 'themeId'> & {
  colorId: ThemeColorIds;
  themeId: Theme;
};

// [TODO:ts] revisit casting
const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop: string): boolean => prop !== 'colorId',
})<ColoredBadgeProps>`
  --badge-background-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --badge-text-color: ${props => themes[props.themeId][`color-${props.colorId}-contrast` as keyof ThemeColors]};
`;

const BaseColoredBadge = React.memo<Omit<ColoredBadgeProps, 'themeId'> & { themeId?: Theme }>(
  withTheme<ColoredBadgeProps>(StyledBadge),
);

/**
 * A colored badge is an extension of the `Badge`
 * component that will have a background of one
 * of the theme's primary colors.
 */
export const ColoredBadge = ((props: ColoredBadgeProps) => (
  <BaseColoredBadge {...props} unthemed />
)) as typeof BaseColoredBadge;

ColoredBadge.displayName = 'ColoredBadge';
