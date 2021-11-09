import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../types/svgIcon';
import { useIconSize } from '../hooks/useIconSize';

export function EyeIcon({ title, titleId = nanoid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Visible'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <path
        fill="currentColor"
        d="M31.74 15.24c.33.45.33 1.07 0 1.51-4.09 5.44-9.63 8.78-15.74 8.78-6.12 0-11.66-3.34-15.75-8.78-.33-.45-.33-1.07 0-1.51C4.34 9.8 9.88 6.46 16 6.46c6.11 0 11.65 3.34 15.74 8.78zm-9.03 1.19a6.74 6.74 0 00-7.15-7.15c-3.35.21-6.07 2.93-6.28 6.28a6.74 6.74 0 007.15 7.15c3.35-.22 6.06-2.93 6.28-6.28zm-6.48 3.18a3.622 3.622 0 11-.46-7.23c2.18-.14 3.99 1.66 3.84 3.84a3.628 3.628 0 01-3.38 3.39z"
      />
    </svg>
  );
}

EyeIcon.displayName = 'EyeIcon';
