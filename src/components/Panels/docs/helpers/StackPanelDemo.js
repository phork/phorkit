import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { TopPanelIcon } from 'icons/internal/TopPanelIcon';
import { IconButton } from 'components/Button';

export function StackPanelDemo({ children, isOpen: initIsOpen, style }) {
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
        style={{ position: 'absolute', top: '-42px', right: '2px' }}
        themeId="light"
        title={isOpen ? 'Close panel' : 'Open panel'}
      >
        <TopPanelIcon size={18} />
      </IconButton>

      {children(isOpen, panelState, setPanelState, toggleOpen)}
    </div>
  );
}

StackPanelDemo.defaultProps = {
  isOpen: false,
  style: undefined,
};

StackPanelDemo.propTypes = {
  children: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  style: PropTypes.object,
};
