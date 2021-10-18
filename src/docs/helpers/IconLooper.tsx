import React from 'react';
import { Icon } from 'types';
import { isKeyof } from 'utils';

export type IconLooperProps = {
  children: (name: string, icon: Icon) => React.ReactElement;
  icons: Record<string, Icon>;
};

export function IconLooper({ children, icons }: IconLooperProps) {
  const items = Object.keys(icons).map(icon => {
    if (isKeyof<typeof icons>(icons, icon)) {
      // eslint-disable-next-line import/namespace
      return children(icon, icons[icon]);
    }
    return null;
  });
  return <React.Fragment>{items}</React.Fragment>;
}

IconLooper.displayName = 'IconLooper';
