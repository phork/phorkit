import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { SvgIconProps } from '../../types/svgIcon';
import { useIconSize } from '../../hooks/useIconSize';

export function PhorkIcon({ title, titleId = uuid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612" aria-labelledby={titleId} {...props}>
      {title === undefined ? <title id={titleId}>{'Phork'}</title> : title ? <title id={titleId}>{title}</title> : null}
      <path
        fill="currentColor"
        d="M306-.2C142-.2 0 145 0 305.8v306h306c162 1.2 306-142.8 306-306C612 136 474.6-.1 306-.2zm74 458.1c-33.8 50.2-83.6 90.5-141 94H60v-179c2.6-58.3 45.2-105.5 94-141l247-172 36 38-212 173c-27 27 9 63 36 36l198-189 35 35-189 198c-29.1 29.1 10 64.2 36 36l173-212 38 36-172 247z"
      />
    </svg>
  );
}
