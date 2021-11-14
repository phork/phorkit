import { Form } from '@storybook/components';
import { styled } from '@storybook/theming';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useRef } from 'react';
import { HexColorPicker, RgbaStringColorPicker } from 'react-colorful';

const Container = styled.div({
  position: 'relative',
});

const Swatches = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  margin: -2,
  marginTop: 12,
  width: 224,
});

const BaseSwatch = styled.button(({ theme, value }) => ({
  appearance: 'button',
  background:
    value ||
    `url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')`,
  border: 'none',
  borderRadius: theme.appBorderRadius,
  boxShadow: `${theme.appBorderColor} 0 0 0 1px inset`,
  cursor: 'pointer',
  height: 16,
  left: 8,
  outline: 'none',
  padding: 0,
  width: 16,

  '&:focus': {
    boxShadow: `${theme.color.dark} 0 0 0 1px inset`,
  },
}));

const InputSwatch = styled(BaseSwatch)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  zIndex: 1,
}));

const PresetSwatch = styled(BaseSwatch)({
  margin: 2,
});

const StyledInput = styled(Form.Input)({
  paddingLeft: 30,
  paddingRight: 30,
});

const RightButton = styled.div({
  position: 'absolute',
  right: 8,
  top: 7,
  zIndex: 1,
});

const CollapsibleContainer = styled.div(({ isVisible }) => ({
  height: 270,
  maxHeight: isVisible ? 270 : 0,
  overflow: 'hidden',
  transition: 'max-height 300ms ease-in-out',
}));

const colorPickerStyles = {
  marginTop: 16,

  '.react-colorful__saturation': {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    order: 1,
    height: 244,
    width: 224,
  },

  '.react-colorful__alpha': {
    borderRadius: 0,
    order: 2,
  },

  '.react-colorful__hue': {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    order: 3,
  },

  '.react-colorful__hue, .react-colorful__alpha': {
    height: 24,
    width: 224,
  },

  '.react-colorful__hue-pointer, .react-colorful__alpha-pointer': {
    width: 20,
    height: 20,
  },
};

const StyledHexColorPicker = styled(HexColorPicker)(colorPickerStyles);
const StyledRgbaColorPicker = styled(RgbaStringColorPicker)(colorPickerStyles);

/**
 * This is a simplified version of Storybook's
 * `ColorControl` because that control exists
 * within a tooltip and that tooltip doesn't work
 * very well if it's inside another tooltip.
 * Why, Storybook, Why? Separation, y'all.
 */
export const ColorPicker = ({
  children,
  format = 'hex',
  isExpanded,
  onChange,
  onFocus,
  onToggleExpansion,
  placeholder,
  presetColors,
  value,
}) => {
  const handleChange = useCallback(color => onChange(color), [onChange]);

  const debouncedHandleChange = useRef();
  useEffect(() => {
    debouncedHandleChange.current = debounce(handleChange, 800);
  }, [handleChange]);

  const ColorPickerByFormat = format === 'rgba' ? StyledRgbaColorPicker : StyledHexColorPicker;

  return (
    <Container>
      <InputSwatch
        aria-label="Toggle color picker"
        onClick={onToggleExpansion}
        role="button"
        value={value}
        tabIndex={0}
        title="Toggle color picker"
      />
      <StyledInput
        value={value || ''}
        onChange={event => handleChange(event.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
      />
      {children && <RightButton>{children}</RightButton>}

      <CollapsibleContainer isVisible={isExpanded}>
        <ColorPickerByFormat
          color={value}
          height={224}
          onChange={color => debouncedHandleChange.current(color)}
          width={224}
        />

        {presetColors && (
          <Swatches>
            {presetColors.map(({ color, title }) => (
              <PresetSwatch
                aria-label={title}
                key={color}
                onClick={() => handleChange(color)}
                role="button"
                value={color}
                tabIndex={0}
                title={title}
              />
            ))}
          </Swatches>
        )}
      </CollapsibleContainer>
    </Container>
  );
};
