import styled from '@emotion/styled';
import { Link, LinkProps } from './Link';

export interface StyledLinkProps extends LinkProps {
  activeColor: string;
  hoverColor: string;
  textColor: string;
}

export const StyledLink = styled(Link, {
  shouldForwardProp: (prop: string) => !['activeColor', 'hoverColor', 'textColor', 'themeId'].includes(prop),
})<StyledLinkProps>`
  ${({ activeColor }) => activeColor && `--link-color: ${activeColor};`}
  ${({ hoverColor }) => hoverColor && `--link-color: ${hoverColor};`}
  ${({ textColor }) => textColor && `--link-color: ${textColor};`}

  --link-active-color: ${props => props.activeColor};
  --link-hover-color: ${props => props.hoverColor};
  --link-color: ${props => props.textColor};
`;

StyledLink.displayName = 'StyledLink';

StyledLink.defaultProps = {
  unthemed: true,
};
