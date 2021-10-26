import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { SvgIconProps } from '../types/svgIcon';
import { useIconSize } from '../hooks/useIconSize';

export function PhorkIcon({ title, titleId = uuid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-labelledby={titleId} {...props}>
      {title === undefined ? <title id={titleId}>{'phork'}</title> : title ? <title id={titleId}>{title}</title> : null}
      <path
        fill="currentColor"
        d="M258.74 323.19c-27.23 40.43-67.34 72.89-113.57 75.71l-105.12-.05c-24.72-.03-39.46-13.16-38.93-43.9L1 254.73c2.09-46.96 36.4-84.98 75.71-113.57L273 4.42c15.8-11 33.2 6 18.2 18-34.63 27.71-168.87 149.62-168.87 149.62-12.33 11.66 3 26.33 14.67 15.33L307.2 38.42c15-12 31.8 5.2 17.8 18.13L168 216.7c-12.33 13 2.67 27.34 15 15 14.01-14.01 160.99-157.84 161.17-158.02 13-12.35 30.46 4.94 17.66 18.34 0 0-147.33 168.13-147.83 168.68-12.33 13.67 2.67 29.67 14.33 16.67 0 0 149.31-169.31 149.5-169.52 12.5-14 29.17 3.17 18.5 17.19L258.74 323.19z"
      />
    </svg>
  );
}

PhorkIcon.displayName = 'PhorkIcon';
