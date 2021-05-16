import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSafeTimeout } from '../../../../hooks/useSafeTimeout';
import { ManagedDropdown } from '../../ManagedDropdown';

const CLOSE_TIMEOUT_ID = 'close';

export function MultiVariantDropdown({ style, ...props }) {
  const [contrast, setContrast] = useState(false);
  const { setSafeTimeout, clearSafeTimeout } = useSafeTimeout();

  const handleOpen = () => {
    clearSafeTimeout(CLOSE_TIMEOUT_ID);
    setContrast(true);
  };

  const handleClose = () => {
    setSafeTimeout(() => setContrast(false), 200, CLOSE_TIMEOUT_ID);
  };

  return (
    <ManagedDropdown
      contrast={contrast}
      onOpen={handleOpen}
      onClose={handleClose}
      style={{
        transition: 'color 300ms ease, background-color 300ms ease',
        ...style,
      }}
      {...props}
    />
  );
}

MultiVariantDropdown.defaultProps = {
  style: undefined,
};

MultiVariantDropdown.propTypes = {
  style: PropTypes.object,
};
