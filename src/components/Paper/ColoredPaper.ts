import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { Paper, PaperProps } from './Paper';

export type ColoredPaperProps = Omit<PaperProps, 'color' | 'themeId'> & {
  colorId: ThemeColorIds;
  themeId: Theme;
};

// [TODO:ts] revisit casting
const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop: string): boolean => prop !== 'colorId',
})<ColoredPaperProps>`
  --paper-background-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --paper-border-color: ${props =>
    themes[props.themeId][`color-${props.colorId}-${props.themeId === 'dark' ? 'L10' : 'D10'}` as keyof ThemeColors]};
  --paper-focused-outline-color: ${props =>
    themes[props.themeId][`color-${props.colorId}-${props.themeId === 'dark' ? 'L30' : 'D30'}` as keyof ThemeColors]};
  --paper-text-color: ${props => themes[props.themeId][`color-${props.colorId}-contrast` as keyof ThemeColors]};
  --paper-scrollbar-thumb-color: ${props => themes[props.themeId]['contrast-scrollbar-thumb-color']};
`;

/**
 * The colored paper is an extension of the `Paper`
 * component that will have a background of one
 * of the theme's primary colors.
 */
export const ColoredPaper = React.memo<Omit<ColoredPaperProps, 'themeId'> & { themeId?: Theme }>(
  withTheme<ColoredPaperProps>(StyledPaper),
);
ColoredPaper.displayName = 'ColoredPaper';

StyledPaper.defaultProps = {
  unthemed: true,
};
