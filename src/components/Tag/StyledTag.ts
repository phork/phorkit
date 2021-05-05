import styled from '@emotion/styled';
import { Tag, TagProps } from './Tag';

export interface StyledTagProps extends TagProps {
  primaryColor: string;
  inverseColor: string;
}

// @ts-ignore [TODO:ts] WTF
export const StyledTag = styled(Tag, {
  shouldForwardProp: (prop: string) => !['primaryColor', 'inverseColor', 'themeId'].includes(prop),
})<StyledTagProps>`
  ${({ primaryColor }) => primaryColor && `--tag-primary-color: ${primaryColor};`}
  ${({ inverseColor }) => inverseColor && `--tag-inverse-color: ${inverseColor};`}
`;

StyledTag.displayName = 'StyledTag';

StyledTag.defaultProps = {
  unthemed: true,
};
