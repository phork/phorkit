import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../../types/svgIcon';
import { useIconSize } from '../../hooks/useIconSize';

export function RightPanelIcon({
  title,
  titleId = nanoid(),
  ...initProps
}: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Right panel'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <path
        fill="currentColor"
        d="M32.02 1.46v29.11c0 .8-.65 1.45-1.45 1.45H1.46c-.81 0-1.46-.65-1.46-1.45V1.46C0 .65.65 0 1.46 0h29.11c.8 0 1.45.65 1.45 1.46zM19.65 2.91H2.91v26.2h16.74V2.91zm9.46 0h-6.55v26.2h6.55V2.91z"
      />
    </svg>
  );
}

RightPanelIcon.displayName = 'RightPanelIcon';
