import styled from '@emotion/styled';
import { Tag, TagProps } from './Tag';

export interface StyledTagProps extends TagProps {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
}

// @ts-ignore [TODO:ts] WTF
export const StyledTag = styled(Tag, {
  shouldForwardProp: (prop: string) => !['backgroundColor', 'borderColor', 'textColor', 'themeId'].includes(prop),
})<StyledTagProps>`
  ${({ backgroundColor }) => backgroundColor && `--tag-background-color: ${backgroundColor};`}
  ${({ borderColor }) => borderColor && `--tag-border-color: ${borderColor};`}
  ${({ textColor }) => textColor && `--tag-text-color: ${textColor};`}
`;

StyledTag.displayName = 'StyledTag';

StyledTag.defaultProps = {
  unthemed: true,
};
