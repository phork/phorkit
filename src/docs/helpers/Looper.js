import PropTypes from 'prop-types';
import React, { cloneElement, Fragment } from 'react';

export function Looper({ end: initEnd, list, render, start, step }) {
  const items = [];
  const end = list ? list.length - 1 : initEnd;

  for (let i = start; i <= end; i += step) {
    items.push(
      cloneElement(render(list ? list[i] : i, i), {
        key: list ? list[i] : i,
      }),
    );
  }

  // eslint-disable-next-line react/jsx-fragments
  return <Fragment>{items}</Fragment>;
}

Looper.defaultProps = {
  end: undefined,
  list: undefined,
  start: 0,
  step: 1,
};

Looper.propTypes = {
  end: PropTypes.number,
  list: PropTypes.array,
  render: PropTypes.func.isRequired,
  start: PropTypes.number,
  step: PropTypes.number,
};
