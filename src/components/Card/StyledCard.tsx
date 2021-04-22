import styled from '@emotion/styled';
import { Card, CardProps } from './Card';

export interface StyledCardProps extends CardProps {
  borderColor?: string;
  hoverBorderColor?: string;
}

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop: string) =>
    !['backgroundColor', 'borderColor', 'hoverBorderColor', 'textColor', 'themeId'].includes(prop),
})<StyledCardProps>`
  ${({ borderColor }) => borderColor && `--card-border-color: ${borderColor};`}
  ${({ hoverBorderColor }) => hoverBorderColor && `--card-hover-border-color: ${hoverBorderColor};`}
`;

StyledCard.displayName = 'StyledCard';

StyledCard.defaultProps = {
  unthemed: true,
};
