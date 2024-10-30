import styled from '@emotion/styled';
import React from 'react';
import { Badge, BadgeProps } from './Badge';

export type StyledBadgeProps = Omit<BadgeProps, 'color' | 'contrast' | 'themeId'> & {
  backgroundColor: string;
  textColor: string;
};

const BaseStyledBadge = styled(Badge, {
  shouldForwardProp: (prop: string) => !['backgroundColor', 'textColor'].includes(prop),
})<StyledBadgeProps>`
  ${({ backgroundColor }) => backgroundColor && `--badge-background-color: ${backgroundColor};`}
  ${({ textColor }) => textColor && `--badge-text-color: ${textColor};`}
`;

/**
 * A styled badge is an extension of the `Badge`
 * component that will have a custom background
 * and text color.
 */
export const StyledBadge = (props: StyledBadgeProps) => <BaseStyledBadge {...props} unthemed />;

StyledBadge.displayName = 'StyledBadge';
