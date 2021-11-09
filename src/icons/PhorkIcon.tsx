import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../types/svgIcon';
import { useIconSize } from '../hooks/useIconSize';

export function PhorkIcon({ title, titleId = nanoid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-labelledby={titleId} {...props}>
      {title === undefined ? <title id={titleId}>{'Phork'}</title> : title ? <title id={titleId}>{title}</title> : null}
      <path
        fill="currentColor"
        d="M270.27 295.39c-24.8 36.82-61.33 66.38-103.44 68.95l-95.74-.04c-22.51-.03-35.94-11.99-35.45-39.99l-.11-91.27c1.9-42.77 33.15-77.4 68.95-103.44L283.26 5.06c14.39-10.02 30.23 5.47 16.57 16.39-31.54 25.24-153.8 136.27-153.8 136.27-11.23 10.62 2.73 23.98 13.36 13.97L314.4 36.03c13.67-10.93 28.97 4.73 16.22 16.51L187.63 198.4c-11.23 11.84 2.43 24.9 13.66 13.66C214.05 199.3 347.91 68.3 348.08 68.14c11.84-11.25 27.74 4.5 16.08 16.7 0 0-134.18 153.13-134.64 153.63-11.23 12.45 2.43 27.03 13.05 15.19 0 0 135.99-154.21 136.16-154.4 11.39-12.75 26.57 2.89 16.85 15.66L270.27 295.39z"
      />
    </svg>
  );
}

PhorkIcon.displayName = 'PhorkIcon';
