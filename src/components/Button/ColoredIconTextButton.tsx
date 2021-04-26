import styled from '@emotion/styled';
import React from 'react';
import { MergeProps, Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { IconTextButton, IconTextButtonElementType, IconTextButtonProps } from './IconTextButton';

export type ColoredIconTextButtonProps<T extends IconTextButtonElementType = 'button'> = MergeProps<
  Omit<IconTextButtonProps<T>, 'width'>,
  {
    colorId: ThemeColorIds;
    themeId: Theme;
  }
>;

// @ts-ignore [TODO:ts] WTF, revisit casting
const StyledIconTextButton = styled(IconTextButton, {
  shouldForwardProp: (prop: string): boolean => !['colorId', 'themeId'].includes(prop),
})<ColoredIconTextButtonProps>`
  --button-primary-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --button-hover-primary-color: ${props => themes[props.themeId][`color-${props.colorId}-L10` as keyof ThemeColors]};
  --button-active-primary-color: ${props => themes[props.themeId][`color-${props.colorId}-D10` as keyof ThemeColors]};
  --button-inverse-color: ${props => themes[props.themeId][`color-${props.colorId}-contrast` as keyof ThemeColors]};
`;

export const ColoredIconTextButton = React.memo<ColoredIconTextButtonProps>(withTheme(StyledIconTextButton));
ColoredIconTextButton.displayName = 'ColoredIconTextButton';

StyledIconTextButton.defaultProps = {
  unthemed: true,
};
