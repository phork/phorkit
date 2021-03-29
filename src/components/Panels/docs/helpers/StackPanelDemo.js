import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { IconButton } from 'components/Button';
import { TopPanelIcon } from 'icons/internal/TopPanelIcon';

export function StackPanelDemo({ children, isOpen: initialIsOpen, style }) {
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
        style={{ position: 'absolute', top: '-42px', right: '2px' }}
        onClick={toggleOpen}
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
