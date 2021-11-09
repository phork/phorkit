import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../types/svgIcon';
import { useIconSize } from '../hooks/useIconSize';

export function ArrowUpIcon({ title, titleId = nanoid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Up arrow'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <path
        fill="currentColor"
        d="M31.67 21.93L16.73 6.99a.98.98 0 00-.73-.32c-.28 0-.53.1-.74.32L.32 21.93c-.21.21-.32.46-.32.73 0 .28.11.53.32.74l1.6 1.6c.22.22.46.32.74.32.28 0 .52-.1.74-.32L16 12.41 28.59 25c.22.22.46.32.74.32.28 0 .53-.1.74-.32l1.6-1.6c.22-.21.32-.46.32-.74 0-.27-.1-.52-.32-.73z"
      />
    </svg>
  );
}

ArrowUpIcon.displayName = 'ArrowUpIcon';
