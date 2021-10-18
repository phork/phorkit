import styled from '@emotion/styled';
import { Header, HeaderProps } from './Header';

export type StyledHeaderProps = Omit<HeaderProps, 'contrast' | 'themeId'> & {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  height?: number | string;
};

/**
 * A styled header is an extension of the `Header`
 * component which can have custom text, border,
 * and background colors, and an optional custom
 * height.
 */
export const StyledHeader = styled(Header, {
  shouldForwardProp: (prop: string) => !['borderColor', 'backgroundColor', 'textColor', 'height'].includes(prop),
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
