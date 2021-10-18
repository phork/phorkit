import styled from '@emotion/styled';
import { Chip, ChipProps } from './Chip';

export type StyledChipProps = Omit<ChipProps, 'contrast' | 'themeId'> & {
  avatarBackgroundColor: string;
  avatarTextColor: string;
  tagActivePrimaryColor?: string;
  tagHoveredPrimaryColor?: string;
  tagInverseColor?: string;
  tagPrimaryColor?: string;
};

/**
 * A styled chip is an extension of the `Chip` component
 * that will have a custom avatar, background and text
 * color.
 */
export const StyledChip = styled(Chip, {
  shouldForwardProp: (prop: string) =>
    ![
      'avatarBackgroundColor',
      'avatarTextColor',
      'tagActivePrimaryColor',
      'tagHoveredPrimaryColor',
      'tagInverseColor',
      'tagPrimaryColor',
    ].includes(prop),
})<StyledChipProps>`
  ${({ avatarBackgroundColor }) => avatarBackgroundColor && `--avatar-background-color: ${avatarBackgroundColor};`}
  ${({ avatarTextColor }) => avatarTextColor && `--avatar-text-color: ${avatarTextColor};`}
  ${({ tagInverseColor }) => tagInverseColor && `--tag-inverse-color: ${tagInverseColor};`}
  ${({ tagPrimaryColor }) => tagPrimaryColor && `--tag-primary-color: ${tagPrimaryColor};`}
  ${({ tagHoveredPrimaryColor }) => tagHoveredPrimaryColor && `--tag-hovered-primary-color: ${tagHoveredPrimaryColor};`}
  ${({ tagActivePrimaryColor }) => tagActivePrimaryColor && `--tag-active-primary-color: ${tagActivePrimaryColor};`}
`;

StyledChip.displayName = 'StyledChip';

StyledChip.defaultProps = {
  unthemed: true,
};
