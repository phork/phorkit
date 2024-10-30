import styled from '@emotion/styled';
import React from 'react';
import { Link, LinkProps } from './Link';

export type StyledLinkProps = Omit<LinkProps, 'contrast' | 'themeId'> & {
  activeColor: string;
  hoveredColor: string;
  textColor: string;
};

const BaseStyledLink = styled(Link, {
  shouldForwardProp: (prop: string) => !['activeColor', 'hoveredColor', 'textColor'].includes(prop),
})<StyledLinkProps>`
  ${({ activeColor }) => activeColor && `--link-active-color: ${activeColor};`}
  ${({ hoveredColor }) => hoveredColor && `--link-hovered-color: ${hoveredColor};`}
  ${({ textColor }) => textColor && `--link-text-color: ${textColor};`}
`;

/**
 * A styled link is an extension of the `Link`
 * component which will have custom inactive,
 * active and hover colors.
 */
export const StyledLink = (props: StyledLinkProps) => <BaseStyledLink {...props} unthemed />;

StyledLink.displayName = 'StyledLink';
