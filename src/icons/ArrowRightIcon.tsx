import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../types/svgIcon';
import { useIconSize } from '../hooks/useIconSize';

export function ArrowRightIcon({
  title,
  titleId = nanoid(),
  ...initProps
}: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Right arrow'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <path
        fill="currentColor"
        d="M25.01 15.26L10.07.32C9.85.11 9.61 0 9.33 0c-.28 0-.52.11-.74.32l-1.6 1.6c-.22.22-.32.46-.32.74 0 .28.1.52.32.74L19.59 16 6.99 28.6c-.22.21-.32.45-.32.73 0 .28.1.53.32.74l1.6 1.6c.22.22.46.32.74.32.28 0 .52-.1.74-.32L25 16.73a.98.98 0 00.32-.73c0-.28-.1-.53-.31-.74z"
      />
    </svg>
  );
}

ArrowRightIcon.displayName = 'ArrowRightIcon';
