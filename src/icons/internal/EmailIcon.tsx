import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../../types/svgIcon';
import { useIconSize } from '../../hooks/useIconSize';

export function EmailIcon({ title, titleId = nanoid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-labelledby={titleId} {...props}>
      {title === undefined ? <title id={titleId}>{'Email'}</title> : title ? <title id={titleId}>{title}</title> : null}
      <path
        fill="currentColor"
        d="M64 15.13v33.75c0 3.12-2.54 5.62-5.62 5.62H5.63C2.54 54.5 0 51.99 0 48.88V15.13c0-3.1 2.52-5.63 5.63-5.63h52.75c3.11 0 5.62 2.54 5.62 5.63zM6.41 13.25C8 14.83 27.56 34.29 28.02 34.74A5.582 5.582 0 0032 36.39c1.5 0 2.91-.58 3.98-1.64.68-.68 20.46-20.36 21.61-21.5H6.41zm13.54 18.76L3.75 15.89v32.22l16.2-16.1zm37.63 18.74l-16.19-16.1-2.76 2.75A9.319 9.319 0 0132 40.14c-2.5 0-4.86-.97-6.63-2.74l-2.76-2.75-16.19 16.1h51.16zm2.67-34.86l-16.2 16.12 16.2 16.1V15.89z"
      />
    </svg>
  );
}

EmailIcon.displayName = 'EmailIcon';
