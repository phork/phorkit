import styled from '@emotion/styled';
import React from 'react';
import { Footer, FooterProps } from './Footer';

export type StyledFooterProps = Omit<FooterProps, 'contrast'> & {
  backgroundColor?: string;
  borderColor?: string;
  focusedOutlineColor?: string;
  scrollbarColor?: string;
  textColor?: string;
  height?: number | string;
  /** Allow the footer to fall back to the normal theme */
  themed?: boolean;
};

const BaseStyledFooter = styled(Footer, {
  shouldForwardProp: (prop: string) =>
    !['borderColor', 'backgroundColor', 'focusedOutlineColor', 'scrollbarThumbColor', 'textColor', 'height'].includes(
      prop,
    ),
})<StyledFooterProps>`
  ${({ backgroundColor, unthemed }) =>
    backgroundColor && `--footer-background-color: ${backgroundColor}${unthemed ? '' : ' !important'};`}
  ${({ borderColor, unthemed }) =>
    borderColor && `--footer-border-color: ${borderColor}${unthemed ? '' : ' !important'};`}

  ${({ focusedOutlineColor, unthemed }) =>
    focusedOutlineColor && `--footer-focused-outline-color: ${focusedOutlineColor}${unthemed ? '' : ' !important'};`}
  ${({ scrollbarColor, unthemed }) =>
    scrollbarColor && `--footer-scrollbar-thumb-color: ${scrollbarColor}${unthemed ? '' : ' !important'};`}

  ${({ textColor, unthemed }) => textColor && `--footer-text-color: ${textColor}${unthemed ? '' : ' !important'};`}
  ${({ height }) => height !== undefined && `height: ${Number.isNaN(Number(height)) ? height : `${height}px`};`}
`;

/**
 * A styled footer is an extension of the `Footer`
 * component which can have custom text, border,
 * and background colors, and an optional custom
 * height.
 */
export const StyledFooter = ({ themed, ...props }: StyledFooterProps) => (
  <BaseStyledFooter {...props} unthemed={!themed} />
);

StyledFooter.displayName = 'StyledFooter';
