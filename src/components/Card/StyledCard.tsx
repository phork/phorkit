import styled from '@emotion/styled';
import { Card, CardProps } from './Card';

export type StyledCardProps = Omit<CardProps, 'themeId'> & {
  borderColor: string;
  hoveredBorderColor: string;
};

/**
 * A styled card is an extension of the `Card`
 * component that will have a custom border
 * and hovered border color.
 */
export const StyledCard = styled(Card, {
  shouldForwardProp: (prop: string) => !['borderColor', 'hoveredBorderColor'].includes(prop),
})<StyledCardProps>`
  ${({ borderColor }) => borderColor && `--card-border-color: ${borderColor};`}
  ${({ hoveredBorderColor }) => hoveredBorderColor && `--card-hovered-border-color: ${hoveredBorderColor};`}
`;

StyledCard.displayName = 'StyledCard';

StyledCard.defaultProps = {
  unthemed: true,
};
