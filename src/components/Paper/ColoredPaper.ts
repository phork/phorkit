import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { Paper, PaperProps } from './Paper';

export interface ColoredPaperProps extends PaperProps {
  colorId: ThemeColorIds;
  themeId: Theme;
}

// [TODO:ts] revisit casting
const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop: string): boolean => !['colorId', 'themeId'].includes(prop),
})<ColoredPaperProps>`
  --paper-background-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --paper-border-color: ${props =>
    themes[props.themeId][`color-${props.colorId}-${props.themeId === 'dark' ? 'L10' : 'D10'}` as keyof ThemeColors]};
  --paper-text-color: ${props => themes[props.themeId][`color-${props.colorId}-contrast` as keyof ThemeColors]};
  --paper-scrollbar-thumb-color: ${props => themes[props.themeId]['contrast-scrollbar-thumb-color']};
`;

export const ColoredPaper = React.memo<ColoredPaperProps>(withTheme<ColoredPaperProps>(StyledPaper));
ColoredPaper.displayName = 'ColoredPaper';

StyledPaper.defaultProps = {
  unthemed: true,
};
