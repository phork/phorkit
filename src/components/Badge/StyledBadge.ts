import styled from '@emotion/styled';
import { Badge, BadgeProps } from './Badge';

export interface StyledBadgeProps extends BadgeProps {
  backgroundColor?: string;
  textColor?: string;
}

export const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop: string) => !['backgroundColor', 'textColor', 'themeId'].includes(prop),
})<StyledBadgeProps>`
  ${({ backgroundColor }) => backgroundColor && `--badge-background-color: ${backgroundColor};`}
  ${({ textColor }) => textColor && `--badge-text-color: ${textColor};`}
`;

StyledBadge.defaultProps = {
  unthemed: true,
};
