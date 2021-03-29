import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

export function StateWrapper({ children, formatSetValue, initialState }) {
  const [state, setState] = useState(initialState);
  const setStateAndFormat = useCallback((...args) => setState(prevState => formatSetValue(prevState, ...args)), [
    formatSetValue,
  ]);

  return children({
    state,
    setState: formatSetValue ? setStateAndFormat : setState,
  });
}

StateWrapper.defaultProps = {
  formatSetValue: undefined,
};

StateWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  formatSetValue: PropTypes.func,
  initialState: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.bool]),
};
