import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../types/svgIcon';
import { useIconSize } from '../hooks/useIconSize';

export function SearchIcon({ title, titleId = nanoid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Search'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <path
        fill="currentColor"
        d="M30.91 31.51c-.31.3-.73.47-1.16.47-.47 0-.9-.18-1.22-.52l-7.67-7.97a12.767 12.767 0 01-7.4 2.33C6.34 25.82.55 20.03.55 12.91S6.34 0 13.46 0s12.92 5.79 12.92 12.91c0 3.05-1.08 5.98-3.03 8.3l7.61 7.92c.64.67.62 1.74-.05 2.38zM3.92 12.91c0 5.26 4.28 9.55 9.54 9.55 5.27 0 9.55-4.29 9.55-9.55 0-5.26-4.28-9.54-9.55-9.54-5.26 0-9.54 4.28-9.54 9.54z"
      />
    </svg>
  );
}

SearchIcon.displayName = 'SearchIcon';
