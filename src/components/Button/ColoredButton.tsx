import styled from '@emotion/styled';
import React from 'react';
import { MergeProps, Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { Button, ButtonProps } from './Button';
import { ButtonElementType } from './types';

export type ColoredButtonProps<T extends ButtonElementType = 'button'> = MergeProps<
  Omit<ButtonProps<T>, 'color' | 'contrast' | 'themeId'>,
  {
    colorId: ThemeColorIds;
    themeId: Theme;
  }
>;

// [TODO:ts] revisit casting
const StyledButton = styled(Button, {
  shouldForwardProp: (prop: string): boolean => prop !== 'colorId',
})<ColoredButtonProps>`
  --button-primary-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --button-hovered-primary-color: ${props => themes[props.themeId][`color-${props.colorId}-L10` as keyof ThemeColors]};
  --button-active-primary-color: ${props => themes[props.themeId][`color-${props.colorId}-D10` as keyof ThemeColors]};
  --button-inverse-color: ${props => themes[props.themeId][`color-${props.colorId}-contrast` as keyof ThemeColors]};
`;

/**
 * A colored button is an extension of the `Button`
 * component that will have a background of one
 * of the theme's primary colors.
 */
export const ColoredButton = withTheme<ColoredButtonProps>(StyledButton) as <T extends ButtonElementType = 'button'>(
  p: Omit<ColoredButtonProps<T>, 'themeId'> & { themeId?: Theme },
) => React.ReactElement<T>;

(ColoredButton as React.NamedExoticComponent).displayName = 'ColoredButton';

StyledButton.defaultProps = {
  unthemed: true,
};
