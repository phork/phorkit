import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../types/svgIcon';
import { useIconSize } from '../hooks/useIconSize';

export function TimesIcon({ title, titleId = nanoid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? <title id={titleId}>{'Close'}</title> : title ? <title id={titleId}>{title}</title> : null}
      <path
        fill="currentColor"
        d="M32 3.2L28.8 0 16 12.8 3.2 0 0 3.2 12.8 16 0 28.8 3.2 32 16 19.2 28.8 32l3.2-3.2L19.2 16 32 3.2z"
      />
    </svg>
  );
}

TimesIcon.displayName = 'TimesIcon';
