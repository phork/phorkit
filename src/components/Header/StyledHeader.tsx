import styled from '@emotion/styled';
import React from 'react';
import { Header, HeaderProps } from './Header';

export type StyledHeaderProps = Omit<HeaderProps, 'contrast'> & {
  backgroundColor?: string;
  borderColor?: string;
  focusedOutlineColor?: string;
  scrollbarColor?: string;
  textColor?: string;
  height?: number | string;
  /** Allow the header to fall back to the normal theme */
  themed?: boolean;
};

const BaseStyledHeader = styled(Header, {
  shouldForwardProp: (prop: string) =>
    !['borderColor', 'backgroundColor', 'focusedOutlineColor', 'scrollbarThumbColor', 'textColor', 'height'].includes(
      prop,
    ),
})<StyledHeaderProps>`
  ${({ backgroundColor, unthemed }) =>
    backgroundColor && `--header-background-color: ${backgroundColor}${unthemed ? '' : ' !important'};`}
  ${({ borderColor, unthemed }) =>
    borderColor && `--header-border-color: ${borderColor}${unthemed ? '' : ' !important'};`}
  ${({ textColor, unthemed }) => textColor && `--header-text-color: ${textColor}${unthemed ? '' : ' !important'};`}

  ${({ focusedOutlineColor, unthemed }) =>
    focusedOutlineColor && `--header-focused-outline-color: ${focusedOutlineColor}${unthemed ? '' : ' !important'};`}
  ${({ scrollbarColor, unthemed }) =>
    scrollbarColor && `--header-scrollbar-thumb-color: ${scrollbarColor}${unthemed ? '' : ' !important'};`}

  ${({ height }) => height !== undefined && `height: ${Number.isNaN(Number(height)) ? height : `${height}px`};`}
`;

/**
 * A styled header is an extension of the `Header`
 * component which can have custom text, border,
 * and background colors, and an optional custom
 * height.
 */
export const StyledHeader = ({ themed, ...props }: StyledHeaderProps) => (
  <BaseStyledHeader {...props} unthemed={!themed} />
);

StyledHeader.displayName = 'StyledHeader';
