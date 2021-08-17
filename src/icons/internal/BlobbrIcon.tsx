import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { SvgIconProps } from '../../types/svgIcon';
import { useIconSize } from '../../hooks/useIconSize';

export function BlobbrIcon({ title, titleId = uuid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 224 224" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Blobbr'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <path
        fill="currentColor"
        d="M112.5 223.9c-50.9 0-92.4-41.4-92.4-92.3 0-30.2 16.1-49.7 23-58 1.1-1.3 1.9-2.3 2.4-3 3.7-5.4 64.4-67.5 67.2-70.3l50 51.7c-2.6 2.8-60.7 64.6-64.4 68.1-4.3 4.1-6.7 9.6-6.7 15.5 0 11.8 9.6 21.4 21.5 21.4s21.5-9.6 21.5-21.4c0-6.8-3.2-13.2-8.7-17.2 7.1-7.5 47.4-50 49.6-52.4.9.9 7.1 7.5 11.8 13.7 3.4 4.5 6 9 6.5 10 7.2 12.1 11 26.5 11 41.9.1 50.9-41.4 92.3-92.3 92.3z"
      />
    </svg>
  );
}

BlobbrIcon.displayName = 'BlobbrIcon';
