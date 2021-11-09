import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../types/svgIcon';
import { useIconSize } from '../hooks/useIconSize';

export function ArrowDownIcon({
  title,
  titleId = nanoid(),
  ...initProps
}: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Down arrow'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <path
        fill="currentColor"
        d="M31.67 8.59l-1.6-1.6a.986.986 0 00-.74-.32c-.28 0-.52.1-.73.32L16 19.59 3.4 6.99c-.22-.22-.46-.32-.74-.32-.28 0-.52.1-.74.32l-1.6 1.6c-.21.21-.32.46-.32.74 0 .28.11.52.32.74L15.26 25c.21.22.46.32.74.32.27 0 .52-.1.73-.32l14.94-14.93c.22-.22.32-.46.32-.74 0-.28-.1-.53-.32-.74z"
      />
    </svg>
  );
}

ArrowDownIcon.displayName = 'ArrowDownIcon';
