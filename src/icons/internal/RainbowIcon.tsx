import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../../types/svgIcon';
import { useIconSize } from '../../hooks/useIconSize';

export function RainbowIcon({ title, titleId = nanoid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Rainbow'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <path
        fill="currentColor"
        d="M80 58.02c0 1.67-1.35 3.01-3.01 3.01-1.67 0-3.02-1.34-3.02-3.01 0-18.73-15.24-33.97-33.97-33.97-18.73 0-33.97 15.24-33.97 33.97 0 1.67-1.35 3.01-3.02 3.01-1.66 0-3.01-1.34-3.01-3.01 0-22.05 17.95-40 40-40s40 17.95 40 40zM40 28.89c16.06 0 29.13 13.07 29.13 29.13 0 1.67-1.35 3.01-3.01 3.01-1.67 0-3.02-1.34-3.02-3.01 0-12.74-10.36-23.11-23.1-23.11-12.75 0-23.12 10.37-23.12 23.11a3 3 0 01-3.01 3.01 3 3 0 01-3.01-3.01c0-16.06 13.07-29.13 29.14-29.13zm0 11.44c9.75 0 17.69 7.94 17.69 17.69 0 1.67-1.35 3.01-3.01 3.01a3 3 0 01-3.01-3.01c0-6.43-5.24-11.66-11.67-11.66-6.44 0-11.67 5.23-11.67 11.66 0 1.67-1.35 3.01-3.01 3.01-1.67 0-3.02-1.34-3.02-3.01 0-9.75 7.94-17.69 17.7-17.69z"
      />
    </svg>
  );
}

RainbowIcon.displayName = 'RainbowIcon';
