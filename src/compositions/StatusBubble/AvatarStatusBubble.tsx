import React from 'react';
import { Avatar, AvatarProps } from '../../components/Avatar';
import { StatusBubble, StatusBubbleProps } from './StatusBubble';

export type AvatarStatusBubbleProps = Omit<StatusBubbleProps, 'anchor'> &
  Pick<AvatarProps, 'imgSrc' | 'initials'> & {
    avatarColor?: AvatarProps['color'];
  };

/**
 * The avatar status bubble extends the `StatusBubble`
 * component with an `Avatar` as its anchor.
 *
 * This uses the `Avatar`, `Shade` and `TooltipContent`
 * components.
 */
export function AvatarStatusBubble({ avatarColor, imgSrc, initials, ...props }: AvatarStatusBubbleProps): JSX.Element {
  return (
    <StatusBubble anchor={<Avatar color={avatarColor} imgSrc={imgSrc} initials={initials} size="large" />} {...props} />
  );
}

AvatarStatusBubble.displayName = 'AvatarStatusBubble';
