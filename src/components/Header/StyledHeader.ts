import styled from '@emotion/styled';
import { Header, HeaderProps } from './Header';

export interface StyledHeaderProps extends HeaderProps {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  height?: number | string;
}

export const StyledHeader = styled(Header, {
  shouldForwardProp: (prop: string) =>
    !['borderColor', 'backgroundColor', 'textColor', 'height', 'themeId'].includes(prop),
})<StyledHeaderProps>`
  ${({ backgroundColor }) => backgroundColor && `--header-background-color: ${backgroundColor};`}
  ${({ borderColor }) => borderColor && `--header-border-color: ${borderColor};`}
  ${({ textColor }) => textColor && `--header-text-color: ${textColor};`}
  ${({ height }) => height !== undefined && `height: ${Number.isNaN(Number(height)) ? height : `${height}px`};`}
`;

StyledHeader.displayName = 'StyledHeader';

StyledHeader.defaultProps = {
  unthemed: true,
};
