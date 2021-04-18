import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { Badge, BadgeProps } from './Badge';

export interface ColoredBadgeProps extends Omit<BadgeProps, 'themeId'> {
  colorId: ThemeColorIds;
  themeId: Theme;
}

// [TODO:ts] revisit casting
const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop: string): boolean => !['colorId', 'themeId', 'variant'].includes(prop),
})<ColoredBadgeProps>`
  --badge-background-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --badge-text-color: ${props => themes[props.themeId][`color-${props.colorId}-contrast` as keyof ThemeColors]};
`;

export const ColoredBadge = React.memo<ColoredBadgeProps>(withTheme(StyledBadge));
ColoredBadge.displayName = 'ColoredBadge';

StyledBadge.defaultProps = {
  unthemed: true,
};
