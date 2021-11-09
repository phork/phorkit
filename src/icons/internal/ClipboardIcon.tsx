import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../../types/svgIcon';
import { useIconSize } from '../../hooks/useIconSize';

export function ClipboardIcon({
  title,
  titleId = nanoid(),
  ...initProps
}: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        fill="currentColor"
        d="M403.68 39.4c27.56 0 50 22.43 50 50V462c0 27.57-22.43 50-50 50H109c-27.57 0-50-22.43-50-50V89.4c0-27.57 22.43-50 50-50h48.66V20c0-11.05 8.96-20 20-20H335c11.05 0 20 8.95 20 20v19.4h48.68zm-206.02.6v38.8H315V40H197.66zm216.02 49.4c0-5.51-4.49-10-10-10H355v19.4c0 11.05-8.95 20-20 20H177.66c-11.04 0-20-8.95-20-20V79.4H109c-5.52 0-10 4.49-10 10V462c0 5.52 4.48 10 10 10h294.68c5.51 0 10-4.48 10-10V89.4z"
      />
    </svg>
  );
}

ClipboardIcon.displayName = 'ClipboardIcon';
