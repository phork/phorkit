import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '../../types';
import { themes, ThemeColors, ThemeColorIds } from '../../config';
import { withTheme } from '../../context/Theme';
import { Divider, DividerProps } from './Divider';

export interface ColoredDividerProps extends DividerProps {
  colorId: ThemeColorIds;
  themeId: Theme;
}

// [TODO:ts] revisit casting
const StyledDivider = styled(Divider, {
  shouldForwardProp: (prop: string): boolean => !['colorId', 'themeId'].includes(prop),
})<ColoredDividerProps>`
  --divider-color: ${props => themes[props.themeId][`color-${props.colorId}` as keyof ThemeColors]};
`;

export const ColoredDivider = React.memo<ColoredDividerProps>(withTheme(StyledDivider));
ColoredDivider.displayName = 'ColoredDivider';

StyledDivider.defaultProps = {
  unthemed: true,
};
