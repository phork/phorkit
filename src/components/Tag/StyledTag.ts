import styled from '@emotion/styled';
import { Tag, TagProps } from './Tag';

export type StyledTagProps = TagProps & {
  primaryColor: string;
  inverseColor: string;
  hoveredPrimaryColor?: string;
  activePrimaryColor?: string;
};

/**
 * A styled tag is an extension of the Tag component
 * and it will have a custom background and text color.
 */
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
