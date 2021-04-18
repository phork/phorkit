import styled from '@emotion/styled';
import React from 'react';
import { MergeProps, Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { IconButton, IconButtonElementType, IconButtonProps } from './IconButton';

export type ColoredIconButtonProps<T extends IconButtonElementType = 'button'> = MergeProps<
  Omit<IconButtonProps<T>, 'width'>,
  {
    colorId: ThemeColorIds;
    themeId: Theme;
  }
>;

// @ts-ignore [TODO:ts] WTF, revisit casting
const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop: string): boolean => !['colorId', 'themeId'].includes(prop),
})<ColoredIconButtonProps>`
  --button-primary-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --button-hover-primary-color: ${props => themes[props.themeId][`color-${props.colorId}-D10` as keyof ThemeColors]};
  --button-active-primary-color: ${props => themes[props.themeId][`color-${props.colorId}-L10` as keyof ThemeColors]};
  --button-inverse-color: ${props => themes[props.themeId][`color-${props.colorId}-contrast` as keyof ThemeColors]};
`;

export const ColoredIconButton = React.memo<ColoredIconButtonProps>(withTheme(StyledIconButton));
ColoredIconButton.displayName = 'ColoredIconButton';

StyledIconButton.defaultProps = {
  unthemed: true,
};
