import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../types/svgIcon';
import { useIconSize } from '../hooks/useIconSize';

export function ArrowDoubleRightIcon({
  title,
  titleId = nanoid(),
  ...initProps
}: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Double right arrow'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <path
        fill="currentColor"
        d="M31.16 15.26L16.22.32c-.21-.21-.46-.32-.74-.32-.27 0-.52.11-.73.32l-1.61 1.6c-.21.22-.32.46-.32.74 0 .28.11.52.32.74L25.74 16l-12.6 12.6a1.002 1.002 0 000 1.47l1.61 1.6c.21.22.46.32.73.32.28 0 .53-.1.74-.32l14.94-14.94c.21-.21.32-.46.32-.73 0-.28-.11-.53-.32-.74z"
      />
      <path
        fill="currentColor"
        d="M19.17 16c0-.28-.11-.53-.32-.74L3.91.32C3.7.11 3.45 0 3.17 0c-.27 0-.52.11-.73.32L.83 1.92c-.21.22-.32.46-.32.74 0 .28.11.52.32.74L13.43 16 .83 28.6a1.002 1.002 0 000 1.47l1.61 1.6c.21.22.46.32.73.32.28 0 .53-.1.74-.32l14.94-14.94c.21-.21.32-.46.32-.73z"
      />
    </svg>
  );
}

ArrowDoubleRightIcon.displayName = 'ArrowDoubleRightIcon';
