import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../types/svgIcon';
import { useIconSize } from '../hooks/useIconSize';

export function ArrowDoubleLeftIcon({
  title,
  titleId = nanoid(),
  ...initProps
}: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Double left arrow'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <path
        fill="currentColor"
        d="M18.56 16l12.6-12.6c.21-.22.32-.46.32-.74 0-.28-.11-.52-.32-.74l-1.6-1.6C29.34.11 29.1 0 28.82 0c-.28 0-.52.11-.74.32L13.14 15.26c-.21.21-.32.46-.32.74 0 .27.11.52.32.73l14.94 14.94c.22.22.46.32.74.32.28 0 .52-.1.74-.32l1.6-1.6a1.002 1.002 0 000-1.47L18.56 16z"
      />
      <path
        fill="currentColor"
        d="M6.25 16l12.6-12.6c.21-.22.32-.46.32-.74 0-.28-.11-.52-.32-.74l-1.6-1.6c-.22-.21-.46-.32-.74-.32-.28 0-.52.11-.74.32L.83 15.26c-.21.21-.32.46-.32.74 0 .27.11.52.32.73l14.94 14.94c.22.22.46.32.74.32.28 0 .52-.1.74-.32l1.6-1.6a1.002 1.002 0 000-1.47L6.25 16z"
      />
    </svg>
  );
}

ArrowDoubleLeftIcon.displayName = 'ArrowDoubleLeftIcon';
