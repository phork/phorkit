import React from 'react';
import { Tag, TagProps } from '../../components/Tag';
import { ChipContent, ChipContentProps } from './ChipContent';

export type ChipProps = Omit<TagProps, 'children' | 'flush' | 'size'> &
  Pick<ChipContentProps, 'avatar' | 'icon' | 'size' | 'style' | 'text'>;

/**
 * A chip is a small group of data that includes an
 * avatar, a label and optionally an icon. The icon
 * can be a button, a simple SVG element, or any
 * other type of element.
 *
 * This uses the `Tag` component.
 */
export function Chip({ avatar, icon, size = 'medium', text, ...props }: ChipProps): JSX.Element {
  return (
    <Tag flush size={size} {...props}>
      <ChipContent avatar={avatar} icon={icon} size={size} text={text} />
    </Tag>
  );
}

Chip.displayName = 'Chip';
