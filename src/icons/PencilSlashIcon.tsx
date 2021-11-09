import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../types/svgIcon';
import { useIconSize } from '../hooks/useIconSize';

export function PencilSlashIcon({
  title,
  titleId = nanoid(),
  ...initProps
}: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Read only'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <g fill="currentColor">
        <path d="M19.92 5.38l6.51 6.51-4.72 4.72-6.48-6.54 4.69-4.69zM9.95 28.37l-6.5-6.51 7.15-7.16 6.48 6.54-7.13 7.13zM31.34 6.96l-3.24 3.25-6.51-6.51L24.37.92a2.885 2.885 0 014.07 0l2.9 2.9c.87.87.87 2.27 0 3.14zM1.66 23.63l6.51 6.51-7.26 1.75a.734.734 0 01-.89-.88l1.64-7.38zM1.43 3.52L4.01.97l26.13 26.37-2.57 2.56L1.43 3.52z" />
      </g>
    </svg>
  );
}

PencilSlashIcon.displayName = 'PencilSlashIcon';
