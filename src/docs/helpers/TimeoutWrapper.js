import PropTypes from 'prop-types';
import { useEffect } from 'react';

export function TimeoutWrapper({ callback, children, milliseconds, infinite }) {
  useEffect(() => {
    const id = (infinite ? setInterval : setTimeout)(callback, milliseconds);
    return () => (infinite ? clearInterval : clearTimeout)(id);
  }, [callback, milliseconds, infinite]);

  return children;
}

TimeoutWrapper.defaultProps = {
  infinite: false,
};

TimeoutWrapper.propTypes = {
  callback: PropTypes.func.isRequired,
  children: PropTypes.node,
  infinite: PropTypes.bool,
  milliseconds: PropTypes.number.isRequired,
};
