import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { Tag, TagElementType, TagProps } from './Tag';

export type ColoredTagProps<T extends TagElementType = 'div'> = Omit<TagProps<T>, 'contrast' | 'themeId'> & {
  colorId: ThemeColorIds;
  themeId: Theme;
};

const StyledTag = styled(Tag, {
  shouldForwardProp: (prop: string) => prop !== 'colorId',
})<ColoredTagProps>`
  --tag-primary-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --tag-hovered-primary-color: ${props => themes[props.themeId][`color-${props.colorId}-L10` as keyof ThemeColors]};
  --tag-active-primary-color: ${props => themes[props.themeId][`color-${props.colorId}-D10` as keyof ThemeColors]};
  --tag-inverse-color: ${props => themes[props.themeId][`color-${props.colorId}-contrast` as keyof ThemeColors]};
`;

/**
 * A colored tag is an extension of the `Tag` component
 * that will have a background of one of the theme's
 * primary colors.
 */
export const ColoredTag = withTheme<ColoredTagProps>(StyledTag) as <T extends TagElementType = 'div'>(
  p: Omit<ColoredTagProps<T>, 'themeId'> & { themeId?: Theme },
) => React.ReactElement<T>;

(ColoredTag as React.NamedExoticComponent).displayName = 'ColoredTag';

StyledTag.defaultProps = {
  unthemed: true,
};
