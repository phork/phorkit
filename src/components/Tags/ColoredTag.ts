import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { Tag, TagProps } from './Tag';

export interface ColoredTagProps extends TagProps {
  colorId: ThemeColorIds;
  filled?: boolean;
  themeId: Theme;
}

// @ts-ignore [TODO:ts] WTF, and revisit casting
const StyledTag = styled(Tag, {
  shouldForwardProp: (prop: string) => !['colorId', 'filled', 'themeId'].includes(prop),
})<ColoredTagProps>`
  --tag-background-color: ${props =>
    themes[props.themeId][`color-${props.colorId}${!props.filled ? '-contrast' : ''}` as keyof ThemeColors]};
  --tag-border-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --tag-text-color: ${props =>
    themes[props.themeId][`color-${props.colorId}${props.filled ? '-contrast' : ''}` as keyof ThemeColors]};
  --tag-hover-background-color: ${props =>
    themes[props.themeId][`color-${props.colorId}${props.filled ? '-contrast' : ''}` as keyof ThemeColors]};
  --tag-hover-border-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --tag-hover-text-color: ${props =>
    themes[props.themeId][`color-${props.colorId}${!props.filled ? '-contrast' : ''}` as keyof ThemeColors]};
`;

export const ColoredTag = React.memo<ColoredTagProps>(withTheme(StyledTag));
ColoredTag.displayName = 'ColoredTag';

StyledTag.defaultProps = {
  unthemed: true,
};
