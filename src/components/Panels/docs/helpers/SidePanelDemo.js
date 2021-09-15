import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { RightPanelIcon } from 'icons/internal/RightPanelIcon';
import { IconButton } from 'components/Button';

export function SidePanelDemo({ children, isOpen: initIsOpen, style }) {
  const [isOpen, setOpen] = useState(initIsOpen);
  const [panelState, setPanelState] = useState('default');

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <div style={{ display: 'flex', margin: '-20px', borderRadius: '4px', ...style }}>
      <IconButton
        color="neutral"
        onClick={toggleOpen}
        style={{ position: 'absolute', top: '-36px', right: '2px' }}
        themeId="light"
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
