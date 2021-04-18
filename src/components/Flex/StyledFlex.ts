import styled from '@emotion/styled';
import { Flex, FlexProps } from './Flex';

export interface StyledFlexProps extends FlexProps {
  flex?: string;
  flexBasis?: number;
  flexGrow?: number;
  flexShrink?: number;
}

export const StyledFlex = styled(Flex, {
  shouldForwardProp: (prop: string) => !['flex', 'flexBasis', 'flexGrow', 'flexShrink'].includes(prop),
})<StyledFlexProps>`
  ${({ flex }) => flex !== undefined && `flex: ${flex}`};
  ${({ flexBasis }) => flexBasis !== undefined && `flex-basis: ${flexBasis}`};
  ${({ flexGrow }) => flexGrow !== undefined && `flex-grow: ${flexGrow}`};
  ${({ flexShrink }) => flexShrink !== undefined && `flex-shrink: ${flexShrink}`};
`;

StyledFlex.displayName = 'StyledFlex';
