import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { Tabs, TabsProps } from './Tabs';

export type ColoredTabsProps = Omit<TabsProps, 'contrast' | 'themeId'> & {
  colorId: ThemeColorIds;
  themeId: Theme;
};

// [TODO:ts] revisit casting
const StyledTabs = styled(Tabs, {
  shouldForwardProp: (prop: string) => prop !== 'colorId',
})<ColoredTabsProps>`
  --tab-background-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --tab-focused-background-color: ${props => themes[props.themeId][`color-${props.colorId}-D10` as keyof ThemeColors]};
  --tab-selected-background-color: ${props => themes[props.themeId][`color-${props.colorId}-L10` as keyof ThemeColors]};
  --tab-text-color: ${props => themes[props.themeId][`color-${props.colorId}-contrast` as keyof ThemeColors]};
  --tab-panel-group-background-color: ${props =>
    themes[props.themeId][`color-${props.colorId}-contrast` as keyof ThemeColors]};
  --tab-panel-group-text-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
  --tabs-border-color: ${props => themes[props.themeId]['color-FG0-O5']};
  --tabs-focused-border-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
`;

/**
 * The colored tabs are an extension of the Tabs
 * component and they will have a background of one
 * of the theme's primary colors.
 */
export const ColoredTabs = React.memo<Omit<ColoredTabsProps, 'themeId'> & { themeId?: Theme }>(
  withTheme<ColoredTabsProps>(StyledTabs),
);
ColoredTabs.displayName = 'ColoredTabs';

StyledTabs.defaultProps = {
  variant: 'colored',
};
