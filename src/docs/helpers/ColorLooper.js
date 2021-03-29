import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { themes } from '../../config/themes';
import { themeIdPropType } from './propTypes';

export function ColorLooper({ render, themeId, group }) {
  const pattern = {
    neutral: /^color-((BG|FG)([0-9]+))$/,
    primary: /^color-((P)([0-9]+))$/,
    state: /^color-((accent-primary|success|warning|danger)-?(.*)(?<!contrast)(?<!O[0-9]+))$/,
    transparent: /^color-((.+)-O([0-9]+))$/,
  }[group];

  if (!pattern) {
    throw new Error('Missing or invalid group');
  }

  const items = Object.keys(themes[themeId]).reduce((acc, prop) => {
    const matches = prop.match(pattern);
    if (matches && matches[1]) {
      acc.push(render({ id: matches[1], color: themes[themeId][prop] }));
    }
    return acc;
  }, []);

  // eslint-disable-next-line react/jsx-fragments
  return <Fragment>{items}</Fragment>;
}

ColorLooper.defaultProps = {
  themeId: undefined,
  group: 'primary',
};

ColorLooper.propTypes = {
  render: PropTypes.func.isRequired,
  themeId: themeIdPropType,
  group: PropTypes.oneOf(['neutral', 'primary', 'state', 'transparent']),
};
