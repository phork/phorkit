import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { Tag, TagProps } from './Tag';

export interface ColoredTagProps extends TagProps {
  colorId: ThemeColorIds;
  themeId: Theme;
}

// @ts-ignore [TODO:ts] WTF, and revisit casting
const StyledTag = styled(Tag, {
  shouldForwardProp: (prop: string) => !['colorId', 'themeId'].includes(prop),
})<ColoredTagProps>`
  --tag-primary-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --tag-inverse-color: ${props => themes[props.themeId][`color-${props.colorId}-contrast` as keyof ThemeColors]};
`;

export const ColoredTag = React.memo<ColoredTagProps>(withTheme<ColoredTagProps>(StyledTag));
ColoredTag.displayName = 'ColoredTag';

StyledTag.defaultProps = {
  unthemed: true,
};
