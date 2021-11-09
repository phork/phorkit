import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../types/svgIcon';
import { useIconSize } from '../hooks/useIconSize';

export function SpinnerIcon({ title, titleId = nanoid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Spinner'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <circle cx={50} cy={50} r={40} fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={6}>
        <animate attributeName="stroke-dashoffset" dur="2s" from={0} repeatCount="indefinite" to={502} />
        <animate
          attributeName="stroke-dasharray"
          dur="2s"
          repeatCount="indefinite"
          values="150.6 100.4;1 250;150.6 100.4"
        />
      </circle>
    </svg>
  );
}

SpinnerIcon.displayName = 'SpinnerIcon';
