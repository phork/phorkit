import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import * as icons from 'icons';

export function IconLooper({ children }) {
  const items = Object.keys(icons).map(icon => children(icon, icons[icon]));
  // eslint-disable-next-line react/jsx-fragments
  return <Fragment>{items}</Fragment>;
}

IconLooper.propTypes = {
  children: PropTypes.func.isRequired,
};
