import styled from '@emotion/styled';
import { Badge, BadgeProps } from './Badge';

export type StyledBadgeProps = Omit<BadgeProps, 'color' | 'contrast' | 'themeId'> & {
  backgroundColor: string;
  textColor: string;
};

/**
 * A styled badge is an extension of the `Badge`
 * component that will have a custom background
 * and text color.
 */
export const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop: string) => !['backgroundColor', 'textColor'].includes(prop),
})<StyledBadgeProps>`
  ${({ backgroundColor }) => backgroundColor && `--badge-background-color: ${backgroundColor};`}
  ${({ textColor }) => textColor && `--badge-text-color: ${textColor};`}
`;

StyledBadge.displayName = 'StyledBadge';

StyledBadge.defaultProps = {
  unthemed: true,
};
