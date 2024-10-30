import styled from '@emotion/styled';
import React from 'react';
import { Card, CardProps } from './Card';

export type StyledCardProps = Omit<CardProps, 'themeId'> & {
  borderColor: string;
  hoveredBorderColor: string;
};

const BaseStyledCard = styled(Card, {
  shouldForwardProp: (prop: string) => !['borderColor', 'hoveredBorderColor'].includes(prop),
})<StyledCardProps>`
  ${({ borderColor }) => borderColor && `--card-border-color: ${borderColor};`}
  ${({ hoveredBorderColor }) => hoveredBorderColor && `--card-hovered-border-color: ${hoveredBorderColor};`}
`;

/**
 * A styled card is an extension of the `Card`
 * component that will have a custom border
 * and hovered border color.
 */
export const StyledCard = (props: StyledCardProps) => <BaseStyledCard {...props} unthemed />;

StyledCard.displayName = 'StyledCard';
