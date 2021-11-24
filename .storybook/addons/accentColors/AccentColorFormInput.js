import { RefreshIcon, HelpIcon } from ' ../../../src/icons/internal';
import { styled } from '@storybook/theming';
import React, { useState } from 'react';
import { ColorPicker } from './ColorPicker';

const ColorContainer = styled.div(({ bordered, theme }) => ({
  borderBottom: bordered ? `1px solid ${theme.appBorderColor}` : 'none',
  display: 'flex',
  flexDirection: 'column',
  margin: 12,
  marginBottom: 16,

  '&:last-child': {
    borderBottom: 'none',
  },
}));

const ColorLabelContainer = styled.div({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  marginBottom: 8,
});

const ColorDescription = styled.div({
  fontSize: 10,
  lineHeight: '13px',
  marginBottom: 16,
  maxWidth: 224,
});

const Unbutton = styled.button(({ disabled, theme }) => ({
  appearance: 'button',
  background: 'transparent',
  border: 'none',
  color: 'currentColor',
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: 0.7,
  outline: 'none',
  padding: 3,
  position: 'relative',

  '&:hover, &:focus': {
    opacity: 0.9,
  },

  '&:focus': {
    color: theme.barSelectedColor,
  },

  '&:active': {
    opacity: 1,
  },

  '&:disabled': {
    opacity: 0.3,
  },
}));

/**
 * The color picker visibility is controlled by
 * the parent because when one color picker opens
 * the others should close.
 */
export const AccentColorFormInput = ({
  description,
  format,
  isColorPickerVisible,
  isGenerateDisabled,
  label,
  onChange,
  onGenerate,
  presetColors,
  toggleColorPickerVisible,
  value,
  width,
}) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  return (
    <ColorContainer bordered={isColorPickerVisible}>
      <ColorLabelContainer>
        <div>{label}</div>
        {description && (
          <Unbutton
            aria-label="Toggle description"
            onClick={() => setIsDescriptionVisible(current => !current)}
            style={{ marginLeft: 4 }}
            title="Toggle description"
          >
            <HelpIcon size={12} style={{ float: 'left' }} title="More information" />
          </Unbutton>
        )}
      </ColorLabelContainer>
      {isDescriptionVisible && <ColorDescription>{description}</ColorDescription>}
      <ColorPicker
        format={format}
        isExpanded={isColorPickerVisible}
        onChange={onChange}
        onFocus={event => event.target.select()}
        onToggleExpansion={toggleColorPickerVisible}
        placeholder="Choose color..."
        presetColors={presetColors}
        value={value}
        width={width}
      >
        {onGenerate && (
          <Unbutton
            aria-label="Generate color"
            disabled={isGenerateDisabled}
            onClick={onGenerate}
            style={{ borderRadius: '100%', marginTop: 6 }}
            title="Generate color"
          >
            <RefreshIcon size={14} style={{ float: 'left' }} title="Generate color" />
          </Unbutton>
        )}
      </ColorPicker>
    </ColorContainer>
  );
};
