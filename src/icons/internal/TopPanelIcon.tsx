import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../../types/svgIcon';
import { useIconSize } from '../../hooks/useIconSize';

export function TopPanelIcon({
  title,
  titleId = nanoid(),
  ...initProps
}: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Top panel'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <path
        fill="currentColor"
        d="M1.46-.02h29.11c.8 0 1.45.65 1.45 1.45v29.11c0 .81-.65 1.46-1.45 1.46H1.46C.65 32 0 31.35 0 30.54V1.43C0 .63.65-.02 1.46-.02zm1.45 12.37v16.74h26.2V12.35H2.91zm0-9.46v6.55h26.2V2.89H2.91z"
      />
    </svg>
  );
}

TopPanelIcon.displayName = 'TopPanelIcon';
