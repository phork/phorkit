import styled from '@emotion/styled';
import React from 'react';
import { MergeProps, Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { Button, ButtonElementType, ButtonProps } from './Button';

export type ColoredButtonProps<T extends ButtonElementType = 'button'> = MergeProps<
  Omit<ButtonProps<T>, 'width'>,
  {
    colorId: ThemeColorIds;
    themeId: Theme;
  }
>;

// @ts-ignore [TODO:ts] WTF, revisit casting
const StyledButton = styled(Button, {
  shouldForwardProp: (prop: string): boolean => !['colorId', 'themeId'].includes(prop),
})<ColoredButtonProps>`
  --button-primary-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --button-hover-primary-color: ${props => themes[props.themeId][`color-${props.colorId}-D10` as keyof ThemeColors]};
  --button-active-primary-color: ${props => themes[props.themeId][`color-${props.colorId}-L10` as keyof ThemeColors]};
  --button-inverse-color: ${props => themes[props.themeId][`color-${props.colorId}-contrast` as keyof ThemeColors]};
`;

export const ColoredButton = React.memo<ColoredButtonProps>(withTheme(StyledButton));

StyledButton.defaultProps = {
  unthemed: true,
};
