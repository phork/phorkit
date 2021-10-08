import React from 'react';
import { AvatarProps } from '../../components/Avatar';
import { Tag, TagProps } from '../../components/Tag';
import { ChipContent } from './ChipContent';
import { ChipSize } from './types';

export type ChipProps = Omit<TagProps, 'children' | 'flush' | 'size'> & {
  avatar: Pick<AvatarProps, 'color' | 'imgSrc' | 'initials' | 'style' | 'translations' | 'themeId' | 'unthemed'>;
  icon?: React.ReactNode;
  text: React.ReactNode;
  size?: ChipSize;
};

/**
 * A chip is a small group of data that includes an
 * avatar, a label and optionally an icon. The icon
 * can be a button, a simple SVG element, or any
 * other type of element.
 */
export function Chip({ avatar, icon, size = 'medium', text, ...props }: ChipProps): React.ReactElement {
  return (
    <Tag flush size={size} {...props}>
      <ChipContent avatar={avatar} icon={icon} size={size} text={text} />
    </Tag>
  );
}

Chip.displayName = 'Chip';
