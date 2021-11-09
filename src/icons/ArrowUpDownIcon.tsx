import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../types/svgIcon';
import { useIconSize } from '../hooks/useIconSize';

export function ArrowUpDownIcon({
  title,
  titleId = nanoid(),
  ...initProps
}: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Up and down arrow'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <path
        fill="currentColor"
        d="M23.84 11.96L16.37 4.5a.48.48 0 00-.37-.16c-.14 0-.27.04-.37.16l-7.47 7.46c-.11.11-.16.24-.16.37 0 .14.05.26.16.37l.8.8a.5.5 0 00.37.16.5.5 0 00.37-.16L16 7.21l6.3 6.29c.11.11.22.16.36.16.14 0 .27-.05.38-.16l.8-.8a.49.49 0 00.15-.37c0-.13-.04-.26-.15-.37zM8.16 20.03l7.47 7.47a.5.5 0 00.37.16.5.5 0 00.37-.16l7.47-7.47c.1-.11.16-.23.16-.37 0-.14-.06-.26-.16-.37l-.8-.8a.5.5 0 00-.37-.16.5.5 0 00-.37.16l-6.3 6.3-6.3-6.3a.5.5 0 00-.37-.16.5.5 0 00-.37.16l-.8.8a.5.5 0 00-.16.37c0 .14.05.26.16.37z"
      />
    </svg>
  );
}

ArrowUpDownIcon.displayName = 'ArrowUpDownIcon';
