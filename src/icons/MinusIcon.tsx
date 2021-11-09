import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../types/svgIcon';
import { useIconSize } from '../hooks/useIconSize';

export function MinusIcon({ title, titleId = nanoid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-labelledby={titleId} {...props}>
      {title === undefined ? <title id={titleId}>{'Minus'}</title> : title ? <title id={titleId}>{title}</title> : null}
      <path fill="currentColor" d="M3 7h10v1H3z" />
    </svg>
  );
}

MinusIcon.displayName = 'MinusIcon';
