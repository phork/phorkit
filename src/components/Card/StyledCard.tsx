import styled from '@emotion/styled';
import { Card, CardProps } from './Card';

export interface StyledCardProps extends CardProps {
  backgroundColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  textColor?: string;
}

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop: string) =>
    !['backgroundColor', 'borderColor', 'hoverBorderColor', 'textColor', 'themeId'].includes(prop),
})<StyledCardProps>`
  ${({ backgroundColor }) => backgroundColor && `--card-background-color: ${backgroundColor};`}
  ${({ borderColor }) => borderColor && `--card-border-color: ${borderColor};`}
  ${({ hoverBorderColor }) => hoverBorderColor && `--card-hover-border-color: ${hoverBorderColor};`}
  ${({ textColor }) => textColor && `--card-text-color: ${textColor};`}
`;

StyledCard.displayName = 'StyledCard';

StyledCard.defaultProps = {
  unthemed: true,
};
