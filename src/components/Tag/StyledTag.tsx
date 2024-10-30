import styled from '@emotion/styled';
import React from 'react';
import { Tag, TagProps } from './Tag';

export type StyledTagProps = Omit<TagProps, 'contrast' | 'themeId'> & {
  primaryColor: string;
  inverseColor: string;
  hoveredPrimaryColor?: string;
  activePrimaryColor?: string;
};

const BaseStyledTag = styled(Tag, {
  shouldForwardProp: (prop: string) =>
    !['primaryColor', 'inverseColor', 'hoveredPrimaryColor', 'activePrimaryColor'].includes(prop),
})<StyledTagProps>`
  ${({ primaryColor }) => primaryColor && `--tag-primary-color: ${primaryColor};`}
  ${({ inverseColor }) => inverseColor && `--tag-inverse-color: ${inverseColor};`}
  ${({ hoveredPrimaryColor }) => hoveredPrimaryColor && `--tag-hovered-primary-color: ${hoveredPrimaryColor};`}
  ${({ activePrimaryColor }) => activePrimaryColor && `--tag-active-primary-color: ${activePrimaryColor};`}
`;

/**
 * A styled tag is an extension of the `Tag` component
 * that will have a custom background and text color.
 */
export const StyledTag = (props: StyledTagProps) => <BaseStyledTag {...props} unthemed />;

StyledTag.displayName = 'StyledTag';
