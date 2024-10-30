import styled from '@emotion/styled';
import React from 'react';
import { Label, LabelProps } from './Label';

export type StyledLabelProps = Omit<LabelProps, 'contrast' | 'themeId'> & {
  fontSize?: number | string;
  lineHeight?: number | string;
  mutedTextColor?: string;
  textColor?: string;
};

const BaseStyledLabel = styled(Label, {
  shouldForwardProp: (prop: string) => !['fontSize', 'lineHeight', 'mutedTextColor', 'textColor'].includes(prop),
})<StyledLabelProps>`
  ${({ fontSize }) =>
    fontSize !== undefined && `--label-font-size: ${Number.isNaN(Number(fontSize)) ? fontSize : `${fontSize}px`};`}
  ${({ lineHeight }) =>
    lineHeight !== undefined &&
    `--label-line-height: ${Number.isNaN(Number(lineHeight)) ? lineHeight : `${lineHeight}px`};`}
  ${({ mutedTextColor }) => mutedTextColor && `--label-muted-text-color: ${mutedTextColor};`}
  ${({ textColor }) => textColor && `--label-text-color: ${textColor};`}
`;

/**
 * A styled label is an extension of the `Label`
 * component that will have a custom text color
 * and font size.
 */
export const StyledLabel = (props: StyledLabelProps) => <BaseStyledLabel {...props} unthemed />;

StyledLabel.displayName = 'StyledLabel';
