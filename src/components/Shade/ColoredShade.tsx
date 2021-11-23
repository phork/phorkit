import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { Shade, ShadeProps } from './Shade';

export type ColoredShadeProps = Omit<ShadeProps, 'color' | 'contrast' | 'themeId'> & {
  colorId: ThemeColorIds;
  themeId: Theme;
};

// [TODO:ts] revisit casting
const StyledShade = styled(Shade, {
  shouldForwardProp: (prop: string): boolean => prop !== 'colorId',
})<ColoredShadeProps>`
  --shade-active-primary-color: ${props => themes[props.themeId][`color-${props.colorId}-D10` as keyof ThemeColors]};
  --shade-inverse-color: ${props => themes[props.themeId][`color-${props.colorId}-contrast` as keyof ThemeColors]};
  --shade-opaque-primary-color: ${props => themes[props.themeId][`color-${props.colorId}-shade` as keyof ThemeColors]};
  --shade-primary-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
`;

/**
 * A colored shade is an extension of the `Shade`
 * component that will have a background, border and
 * text of one of the theme's primary colors.
 */
export const ColoredShade = React.memo<Omit<ColoredShadeProps, 'themeId'> & { themeId?: Theme }>(
  withTheme<ColoredShadeProps>(StyledShade),
);

ColoredShade.displayName = 'ColoredShade';
