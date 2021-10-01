import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { LineLoader, LineLoaderProps } from './LineLoader';

export type ColoredLineLoaderProps = LineLoaderProps & {
  colorId: ThemeColorIds;
  themeId: Theme;
};

// [TODO:ts] revisit casting
const StyledLineLoader = styled(LineLoader, {
  shouldForwardProp: prop => prop !== 'colorId',
})<ColoredLineLoaderProps>`
  --line-loader-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
`;

/**
 * A colored line load is an extension of the LineLoader
 * component which will be the color of one of the
 * theme's primary colors.
 */
export const ColoredLineLoader = React.memo<ColoredLineLoaderProps>(
  withTheme<ColoredLineLoaderProps>(StyledLineLoader),
);
ColoredLineLoader.displayName = 'ColoredLineLoader';

StyledLineLoader.defaultProps = {
  unthemed: true,
};
