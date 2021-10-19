import styled from '@emotion/styled';
import React from 'react';
import { MergeProps, Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { IconButton, IconButtonElementType, IconButtonProps } from './IconButton';
import { ButtonElementType } from './types';

export type ColoredIconButtonProps<T extends IconButtonElementType = 'button'> = MergeProps<
  Omit<IconButtonProps<T>, 'color' | 'contrast' | 'themeId'>,
  {
    colorId: ThemeColorIds;
    themeId: Theme;
  }
>;

// [TODO:ts] revisit casting
const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop: string): boolean => prop !== 'colorId',
})<ColoredIconButtonProps>`
  --button-primary-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --button-hovered-primary-color: ${props => themes[props.themeId][`color-${props.colorId}-L10` as keyof ThemeColors]};
  --button-active-primary-color: ${props => themes[props.themeId][`color-${props.colorId}-D10` as keyof ThemeColors]};
  --button-inverse-color: ${props => themes[props.themeId][`color-${props.colorId}-contrast` as keyof ThemeColors]};
`;

/**
 * A colored icon button is an extension of the
 * `IconButton` component that will have a background
 * of one of the theme's primary colors.
 */
export const ColoredIconButton = withTheme<ColoredIconButtonProps>(StyledIconButton) as <
  T extends ButtonElementType = 'button',
>(
  p: Omit<ColoredIconButtonProps<T>, 'themeId'> & { themeId?: Theme },
) => React.ReactElement<T>;

(ColoredIconButton as React.NamedExoticComponent).displayName = 'ColoredIconButton';

StyledIconButton.defaultProps = {
  unthemed: true,
};
