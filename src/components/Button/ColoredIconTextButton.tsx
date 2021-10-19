import styled from '@emotion/styled';
import React from 'react';
import { MergeProps, Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { IconTextButton, IconTextButtonElementType, IconTextButtonProps } from './IconTextButton';
import { ButtonElementType } from './types';

export type ColoredIconTextButtonProps<T extends IconTextButtonElementType = 'button'> = MergeProps<
  Omit<IconTextButtonProps<T>, 'color' | 'contrast' | 'themeId'>,
  {
    colorId: ThemeColorIds;
    themeId: Theme;
  }
>;

// [TODO:ts] revisit casting
const StyledIconTextButton = styled(IconTextButton, {
  shouldForwardProp: (prop: string): boolean => prop !== 'colorId',
})<ColoredIconTextButtonProps>`
  --button-primary-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --button-hovered-primary-color: ${props => themes[props.themeId][`color-${props.colorId}-L10` as keyof ThemeColors]};
  --button-active-primary-color: ${props => themes[props.themeId][`color-${props.colorId}-D10` as keyof ThemeColors]};
  --button-inverse-color: ${props => themes[props.themeId][`color-${props.colorId}-contrast` as keyof ThemeColors]};
`;

/**
 * A colored icon text button is an extension of the
 * `IconTextButton` component that will have a background
 * of one of the theme's primary colors.
 */
export const ColoredIconTextButton = withTheme<ColoredIconTextButtonProps>(StyledIconTextButton) as <
  T extends ButtonElementType = 'button',
>(
  p: Omit<ColoredIconTextButtonProps<T>, 'themeId'> & { themeId?: Theme },
) => React.ReactElement<T>;

(ColoredIconTextButton as React.NamedExoticComponent).displayName = 'ColoredIconTextButton';

StyledIconTextButton.defaultProps = {
  unthemed: true,
};
