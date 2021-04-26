import styled from '@emotion/styled';
import { Label, LabelProps } from './Label';

export interface StyledLabelProps extends LabelProps {
  mutedTextColor: string;
  textColor: string;
}

export const StyledLabel = styled(Label, {
  shouldForwardProp: (prop: string) => !['mutedTextColor', 'textColor', 'themeId'].includes(prop),
})<StyledLabelProps>`
  ${({ mutedTextColor }) => mutedTextColor && `--label-muted-text-color: ${mutedTextColor};`}
  ${({ textColor }) => textColor && `--label-text-color: ${textColor};`}
`;

StyledLabel.displayName = 'StyledLabel';

StyledLabel.defaultProps = {
  unthemed: true,
};
