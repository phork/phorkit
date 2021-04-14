import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Icon } from 'types';
import { isKeyof } from 'utils';
import * as icons from 'icons';

export interface IconLooperProps {
  children: (name: string, icon: Icon) => React.ReactElement;
}

export function IconLooper({ children }: IconLooperProps) {
  const items = Object.keys(icons).map(icon => {
    if (isKeyof<typeof icons>(icons, icon)) {
      // eslint-disable-next-line import/namespace
      return children(icon, icons[icon]);
    }
    return null;
  });
  // eslint-disable-next-line react/jsx-fragments
  return <Fragment>{items}</Fragment>;
}

IconLooper.propTypes = {
  children: PropTypes.func.isRequired,
};
