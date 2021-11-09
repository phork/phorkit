import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../../types/svgIcon';
import { useIconSize } from '../../hooks/useIconSize';

export function MoonIcon({ title, titleId = nanoid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 203 203" aria-labelledby={titleId} {...props}>
      {title === undefined ? <title id={titleId}>{'Moon'}</title> : title ? <title id={titleId}>{title}</title> : null}
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M202.45 127.85c-6.1 21.15-19.04 40.18-36.45 53.6-18.07 13.93-39.71 21.29-62.57 21.29C46.4 202.74 0 156.33 0 99.3c0-22.86 7.36-44.49 21.29-62.55C34.71 19.35 53.76 6.41 74.92.31a7.503 7.503 0 018.57 10.97c-7.24 12.47-10.91 25.74-10.91 39.43 0 43.81 35.64 79.45 79.44 79.45 13.63 0 26.92-3.67 39.49-10.89a7.494 7.494 0 0110.94 8.58zm-21.08 12.43c-9.53 3.24-19.35 4.88-29.35 4.88-52.07 0-94.44-42.37-94.44-94.45a90.49 90.49 0 014.86-29.3C33.83 36.46 15 66.4 15 99.3c0 48.76 39.67 88.43 88.43 88.43 32.93 0 62.89-18.83 77.94-47.45z"
      />
    </svg>
  );
}

MoonIcon.displayName = 'MoonIcon';
