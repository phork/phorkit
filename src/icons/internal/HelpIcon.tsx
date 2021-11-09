import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../../types/svgIcon';
import { useIconSize } from '../../hooks/useIconSize';

export function HelpIcon({ title, titleId = nanoid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? <title id={titleId}>{'Help'}</title> : title ? <title id={titleId}>{title}</title> : null}
      <path
        fill="currentColor"
        d="M14.39 22.41h3.2v3.2h-3.2v-3.2zm1.6-16.02a6.4 6.4 0 00-6.4 6.4h3.2c0-1.76 1.44-3.2 3.2-3.2 1.76 0 3.2 1.44 3.2 3.2 0 3.2-4.8 2.8-4.8 7.99h3.2c0-3.59 4.79-3.99 4.79-7.99 0-3.53-2.86-6.4-6.39-6.4z"
      />
      <path
        fill="currentColor"
        d="M31.97 15.99c0 8.82-7.16 15.98-15.98 15.98C7.16 31.97 0 24.81 0 15.99 0 7.16 7.16 0 15.99 0c8.82 0 15.98 7.16 15.98 15.99zm-3.19 0c0-7.05-5.74-12.79-12.79-12.79C8.94 3.2 3.2 8.94 3.2 15.99c0 7.05 5.74 12.79 12.79 12.79 7.05 0 12.79-5.74 12.79-12.79z"
      />
    </svg>
  );
}

HelpIcon.displayName = 'HelpIcon';
