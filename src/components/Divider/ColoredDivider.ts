import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { Divider, DividerProps } from './Divider';

export type ColoredDividerProps = DividerProps & {
  colorId: ThemeColorIds;
  themeId: Theme;
};

const opacities = {
  quiet: 0.5,
  quieter: 0.4,
  quietest: 0.3,
};

// [TODO:ts] revisit casting
const StyledDivider = styled(Divider, {
  shouldForwardProp: (prop: string): boolean => !['colorId', 'themeId', 'volume'].includes(prop),
})<ColoredDividerProps>`
  --divider-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  ${({ volume }) => volume && `opacity: ${opacities[volume] || 1};`}
`;

/**
 * A colored divider is an extension of the Divider
 * component which will be the color of one of the
 * theme's primary colors.
 */
export const ColoredDivider = React.memo<ColoredDividerProps>(withTheme<ColoredDividerProps>(StyledDivider));
ColoredDivider.displayName = 'ColoredDivider';

StyledDivider.defaultProps = {
  unthemed: true,
};
