import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../types/svgIcon';
import { useIconSize } from '../hooks/useIconSize';

export function ArrowLeftIcon({
  title,
  titleId = nanoid(),
  ...initProps
}: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Left arrow'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <path
        fill="currentColor"
        d="M12.41 16L25 3.4c.22-.22.32-.46.32-.74 0-.28-.1-.52-.32-.74L23.4.32c-.21-.21-.46-.32-.74-.32-.27 0-.52.11-.73.32L6.99 15.26c-.22.21-.32.46-.32.74 0 .27.1.52.32.73l14.94 14.94c.21.22.46.32.73.32.28 0 .53-.1.74-.32l1.6-1.6c.22-.21.32-.46.32-.74 0-.28-.1-.52-.32-.73L12.41 16z"
      />
    </svg>
  );
}

ArrowLeftIcon.displayName = 'ArrowLeftIcon';
