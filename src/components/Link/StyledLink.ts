import styled from '@emotion/styled';
import { Link, LinkProps } from './Link';

export interface StyledLinkProps extends LinkProps {
  activeColor: string;
  hoveredColor: string;
  textColor: string;
}

export const StyledLink = styled(Link, {
  shouldForwardProp: (prop: string) => !['activeColor', 'hoveredColor', 'textColor', 'themeId'].includes(prop),
})<StyledLinkProps>`
  ${({ activeColor }) => activeColor && `--link-active-color: ${activeColor};`}
  ${({ hoveredColor }) => hoveredColor && `--link-hovered-color: ${hoveredColor};`}
  ${({ textColor }) => textColor && `--link-text-color: ${textColor};`}
`;

StyledLink.displayName = 'StyledLink';

StyledLink.defaultProps = {
  unthemed: true,
};
