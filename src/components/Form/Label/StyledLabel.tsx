import styled from '@emotion/styled';
import { Label, LabelProps } from './Label';

export type StyledLabelProps = LabelProps & {
  fontSize?: number | string;
  lineHeight?: number | string;
  mutedTextColor?: string;
  textColor?: string;
};

export const StyledLabel = styled(Label, {
  shouldForwardProp: (prop: string) =>
    !['fontSize', 'lineHeight', 'mutedTextColor', 'textColor', 'themeId'].includes(prop),
})<StyledLabelProps>`
  ${({ fontSize }) =>
    fontSize !== undefined && `--label-font-size: ${Number.isNaN(Number(fontSize)) ? fontSize : `${fontSize}px`};`}
  ${({ lineHeight }) =>
    lineHeight !== undefined &&
    `--label-line-height: ${Number.isNaN(Number(lineHeight)) ? lineHeight : `${lineHeight}px`};`}
  ${({ mutedTextColor }) => mutedTextColor && `--label-muted-text-color: ${mutedTextColor};`}
  ${({ textColor }) => textColor && `--label-text-color: ${textColor};`}
`;

StyledLabel.displayName = 'StyledLabel';

StyledLabel.defaultProps = {
  unthemed: true,
};
