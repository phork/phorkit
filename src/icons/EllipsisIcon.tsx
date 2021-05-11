import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { SvgIconProps } from '../types/svgIcon';
import { useIconSize } from '../hooks/useIconSize';

export function EllipsisIcon({ title, titleId = uuid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Ellipses'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <g fill="currentColor">
        <circle cx={4} cy={20} r={4} />
        <circle cx={20} cy={20} r={4} />
        <circle cx={36} cy={20} r={4} />
      </g>
    </svg>
  );
}
EllipsisIcon.displayName = 'SvgIcon';
