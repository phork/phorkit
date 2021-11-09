import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../types/svgIcon';
import { useIconSize } from '../hooks/useIconSize';

export function PinIcon({ title, titleId = nanoid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? <title id={titleId}>{'Pin'}</title> : title ? <title id={titleId}>{title}</title> : null}
      <path
        fill="currentColor"
        d="M21.58 13.39L20.93 6h2.23c.7 0 1.26-.67 1.26-1.5v-3c0-.83-.56-1.5-1.26-1.5H8.84c-.7 0-1.26.67-1.26 1.5v3c0 .83.56 1.5 1.26 1.5h2.23l-.65 7.39c-2.55 1.41-4.53 3.94-4.53 7.11 0 .83.57 1.5 1.27 1.5h7.16v6.5c0 .08.01.15.04.22l1.26 3c.16.37.6.37.76 0l1.26-3c.01-.01.01-.03.02-.05.01-.02.01-.04.02-.05v-.06V22h7.16c.7 0 1.27-.67 1.27-1.5 0-3.2-2-5.71-4.53-7.11z"
      />
    </svg>
  );
}

PinIcon.displayName = 'PinIcon';
