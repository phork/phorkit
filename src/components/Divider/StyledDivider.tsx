import styled from '@emotion/styled';
import React from 'react';
import { Divider, DividerProps } from './Divider';

export type StyledDividerProps = Omit<DividerProps, 'contrast' | 'themeId' | 'variant'> & {
  dividerColor: string;
};

const BaseStyledDivider = styled(Divider, {
  shouldForwardProp: (prop: string) => prop !== 'dividerColor',
})<StyledDividerProps>`
  ${({ dividerColor }) => dividerColor && `--divider-color: ${dividerColor};`}
`;

/**
 * A styled divider is an extension of the `Divider`
 * component which will be a custom color.
 */
export const StyledDivider = (props: StyledDividerProps) => <BaseStyledDivider {...props} unthemed />;

StyledDivider.displayName = 'StyledDivider';
