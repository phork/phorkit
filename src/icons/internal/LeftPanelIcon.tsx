import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { SvgIconProps } from '../../types/svgIcon';
import { useIconSize } from '../../hooks/useIconSize';

export function LeftPanelIcon({ title, titleId = uuid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Left panel'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <path
        fill="currentColor"
        d="M1.43 0h29.11C31.35 0 32 .65 32 1.46v29.11c0 .8-.65 1.45-1.46 1.45H1.43c-.8 0-1.45-.65-1.45-1.45V1.46C-.02.65.63 0 1.43 0zm10.92 29.11h16.74V2.91H12.35v26.2zm-9.46 0h6.55V2.91H2.89v26.2z"
      />
    </svg>
  );
}
