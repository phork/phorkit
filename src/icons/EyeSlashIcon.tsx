import { nanoid } from 'nanoid';
import * as React from 'react';
import { SvgIconProps } from '../types/svgIcon';
import { useIconSize } from '../hooks/useIconSize';

export function EyeSlashIcon({
  title,
  titleId = nanoid(),
  ...initProps
}: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Hidden'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <style />
      <g pointerEvents="bounding-box">
        <path
          fill="currentColor"
          className="muted"
          d="M31.74 15.24c.33.45.33 1.07 0 1.51-4.09 5.44-9.63 8.78-15.74 8.78-2.26 0-4.44-.46-6.49-1.3l2.65-2.7c1.2.83 2.68 1.28 4.27 1.18 3.35-.22 6.06-2.93 6.28-6.28.1-1.63-.38-3.14-1.25-4.35l3.2-3.25c2.65 1.52 5.04 3.71 7.08 6.41zM.25 16.75c-.33-.45-.33-1.07 0-1.51C4.34 9.8 9.88 6.46 16 6.46c2.05 0 4.05.38 5.94 1.09l-2.58 2.62c-1.1-.64-2.41-.98-3.8-.89-3.35.21-6.07 2.93-6.28 6.28-.09 1.43.27 2.77.94 3.89l-3.37 3.43c-2.45-1.5-4.69-3.59-6.6-6.13zm15.98 2.86c-.66.04-1.28-.09-1.82-.36l4.82-4.9c.29.55.43 1.2.38 1.87a3.628 3.628 0 01-3.38 3.39zm-3.85-3.85c.11-1.81 1.58-3.27 3.39-3.38.44-.03.88.02 1.28.14l-4.51 4.58c-.13-.42-.19-.87-.16-1.34z"
        />
        <path fill="currentColor" d="M28.01 3.11l.93.92L4.36 29l-.62-.62-.01.01-.93-.92L27.38 2.5l.62.62.01-.01z" />
      </g>
    </svg>
  );
}

EyeSlashIcon.displayName = 'EyeSlashIcon';
