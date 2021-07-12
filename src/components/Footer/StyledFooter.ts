import styled from '@emotion/styled';
import { Footer, FooterProps } from './Footer';

export interface StyledFooterProps extends FooterProps {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  height?: number | string;
}

export const StyledFooter = styled(Footer, {
  shouldForwardProp: (prop: string) =>
    !['borderColor', 'backgroundColor', 'textColor', 'height', 'themeId'].includes(prop),
})<StyledFooterProps>`
  ${({ backgroundColor }) => backgroundColor && `--footer-background-color: ${backgroundColor};`}
  ${({ borderColor }) => borderColor && `--footer-border-color: ${borderColor};`}
  ${({ textColor }) => textColor && `--footer-text-color: ${textColor};`}
  ${({ height }) => height !== undefined && `height: ${Number.isNaN(Number(height)) ? height : `${height}px`};`}
`;

StyledFooter.displayName = 'StyledFooter';

StyledFooter.defaultProps = {
  unthemed: true,
};
