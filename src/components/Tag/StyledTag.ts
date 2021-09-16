import styled from '@emotion/styled';
import { Tag, TagProps } from './Tag';

export interface StyledTagProps extends TagProps {
  primaryColor: string;
  inverseColor: string;
  hoveredPrimaryColor?: string;
  activePrimaryColor?: string;
}

// @ts-ignore [TODO:ts] WTF
export const StyledTag = styled(Tag, {
  shouldForwardProp: (prop: string) =>
    !['primaryColor', 'inverseColor', 'hoveredPrimaryColor', 'activePrimaryColor', 'themeId'].includes(prop),
})<StyledTagProps>`
  ${({ primaryColor }) => primaryColor && `--tag-primary-color: ${primaryColor};`}
  ${({ inverseColor }) => inverseColor && `--tag-inverse-color: ${inverseColor};`}
  ${({ hoveredPrimaryColor }) => hoveredPrimaryColor && `--tag-hovered-primary-color: ${hoveredPrimaryColor};`}
  ${({ activePrimaryColor }) => activePrimaryColor && `--tag-active-primary-color: ${activePrimaryColor};`}
`;

StyledTag.displayName = 'StyledTag';

StyledTag.defaultProps = {
  unthemed: true,
};
