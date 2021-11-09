import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../../types/svgIcon';
import { useIconSize } from '../../hooks/useIconSize';

export function TagIcon({ title, titleId = nanoid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? <title id={titleId}>{'Tag'}</title> : title ? <title id={titleId}>{title}</title> : null}
      <path
        fill="currentColor"
        d="M31.97 18.91c0 .74-.26 1.37-.78 1.89L20.83 31.19c-.55.52-1.19.78-1.92.78-.75 0-1.38-.26-1.9-.78L1.92 16.08c-.53-.52-.99-1.23-1.36-2.13-.37-.9-.56-1.73-.56-2.47V2.7C0 1.97.27 1.34.8.8 1.34.27 1.97 0 2.7 0h8.78c.74 0 1.57.19 2.47.56.9.37 1.61.83 2.15 1.36l15.09 15.07c.52.54.78 1.18.78 1.92zM9.45 6.75c0-.74-.26-1.38-.79-1.91-.53-.52-1.16-.79-1.91-.79-.74 0-1.38.27-1.91.79-.53.53-.79 1.17-.79 1.91 0 .75.26 1.38.79 1.91s1.17.79 1.91.79c.75 0 1.38-.26 1.91-.79s.79-1.16.79-1.91z"
      />
    </svg>
  );
}

TagIcon.displayName = 'TagIcon';
