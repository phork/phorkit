import styled from '@emotion/styled';
import { Footer, FooterProps } from './Footer';

export type StyledFooterProps = Omit<FooterProps, 'contrast' | 'themeId'> & {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  height?: number | string;
};

/**
 * A styled footer is an extension of the `Footer`
 * component which can have custom text, border,
 * and background colors, and an optional custom
 * height.
 */
export const StyledFooter = styled(Footer, {
  shouldForwardProp: (prop: string) => !['borderColor', 'backgroundColor', 'textColor', 'height'].includes(prop),
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
