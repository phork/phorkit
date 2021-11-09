import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../../types/svgIcon';
import { useIconSize } from '../../hooks/useIconSize';

export function CheckIcon({ title, titleId = nanoid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? <title id={titleId}>{'Check'}</title> : title ? <title id={titleId}>{title}</title> : null}
      <path fill="currentColor" d="M10.18 23.08l-7.64-7.63L0 17.99l10.18 10.18L31.99 6.36l-2.55-2.54-19.26 19.26z" />
    </svg>
  );
}

CheckIcon.displayName = 'CheckIcon';
