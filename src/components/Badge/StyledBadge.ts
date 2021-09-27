import styled from '@emotion/styled';
import { Badge, BadgeProps } from './Badge';

export interface StyledBadgeProps extends BadgeProps {
  backgroundColor: string;
  textColor: string;
}

/**
 * A styled badge is an extension of the Badge
 * component which will have a custom text and
 * background color.
 */
export const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop: string) => !['backgroundColor', 'textColor', 'themeId'].includes(prop),
})<StyledBadgeProps>`
  ${({ backgroundColor }) => backgroundColor && `--badge-background-color: ${backgroundColor};`}
  ${({ textColor }) => textColor && `--badge-text-color: ${textColor};`}
`;

StyledBadge.displayName = 'StyledBadge';

StyledBadge.defaultProps = {
  unthemed: true,
};
