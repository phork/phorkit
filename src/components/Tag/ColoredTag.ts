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

const StyledTag = styled(Tag, {
  shouldForwardProp: (prop: string) => !['colorId', 'themeId'].includes(prop),
})<ColoredTagProps>`
  --tag-primary-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --tag-hovered-primary-color: ${props => themes[props.themeId][`color-${props.colorId}-L10` as keyof ThemeColors]};
  --tag-active-primary-color: ${props => themes[props.themeId][`color-${props.colorId}-D10` as keyof ThemeColors]};
  --tag-inverse-color: ${props => themes[props.themeId][`color-${props.colorId}-contrast` as keyof ThemeColors]};
`;

/**
 * A colored tag is an extension of the Tag component
 * and it will have a background of one of the theme's
 * primary colors.
 */
export const ColoredTag = React.memo<ColoredTagProps>(withTheme<ColoredTagProps>(StyledTag));
ColoredTag.displayName = 'ColoredTag';

StyledTag.defaultProps = {
  unthemed: true,
};
