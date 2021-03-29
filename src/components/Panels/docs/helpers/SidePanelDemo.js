import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { IconButton } from 'components/Button';
import { RightPanelIcon } from 'icons/internal/RightPanelIcon';

export function SidePanelDemo({ children, isOpen: initialIsOpen, style }) {
  const [isOpen, setOpen] = useState(initialIsOpen);
  const [panelState, setPanelState] = useState('default');

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <div style={{ display: 'flex', margin: '-20px', borderRadius: '4px', ...style }}>
      <IconButton
        themeId="light"
        color="neutral"
        style={{ position: 'absolute', top: '-36px', right: '2px' }}
        onClick={toggleOpen}
        title={isOpen ? 'Close panel' : 'Open panel'}
      >
        <RightPanelIcon size={18} />
      </IconButton>

      {children(isOpen, panelState, setPanelState, toggleOpen)}
    </div>
  );
}

SidePanelDemo.defaultProps = {
  isOpen: false,
  style: undefined,
};

SidePanelDemo.propTypes = {
  children: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  style: PropTypes.object,
};
