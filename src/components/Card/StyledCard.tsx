import styled from '@emotion/styled';
import { Card, CardProps } from './Card';

export interface StyledCardProps extends CardProps {
  borderColor: string;
  hoveredBorderColor: string;
}

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop: string) => !['borderColor', 'hoveredBorderColor', 'themeId'].includes(prop),
})<StyledCardProps>`
  ${({ borderColor }) => borderColor && `--card-border-color: ${borderColor};`}
  ${({ hoveredBorderColor }) => hoveredBorderColor && `--card-hovered-border-color: ${hoveredBorderColor};`}
`;

StyledCard.displayName = 'StyledCard';

StyledCard.defaultProps = {
  unthemed: true,
};
