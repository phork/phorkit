import { Form } from '@storybook/components';
import { styled } from '@storybook/theming';
import React, { useCallback, useMemo } from 'react';
import { HexColorPicker, RgbaStringColorPicker } from 'react-colorful';

const Container = styled.div(({ width }) => ({
  overflow: 'hidden',
  position: 'relative',
  width,
}));

const Swatches = styled.div(({ width }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  margin: -2,
  marginTop: 12,
  width,
}));

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
    boxShadow: `${theme.color.mediumdark} 0 0 0 1px inset`,
  },
}));

const InputSwatch = styled(BaseSwatch)({
  position: 'absolute',
  top: 8,
  zIndex: 1,
});

const PresetSwatch = styled(BaseSwatch)({
  margin: 2,
});

const StyledInput = styled(Form.Input)({
  paddingLeft: 30,
  paddingRight: 30,
  width: '100%',
});

const RightButton = styled.div({
  position: 'absolute',
  right: 8,
  top: 0,
  zIndex: 1,
});

const CollapsibleContainer = styled.div(({ width, isVisible }) => ({
  height: width + 50,
  maxHeight: isVisible ? width + 50 : 0,
  overflow: 'hidden',
  // this seems counter-intuitive but it's correct
  transition: isVisible ? 'max-height 300ms ease-in-out' : 'max-height 300ms ease-in-out, visibility 0s linear 300ms',
  visibility: isVisible ? 'visible' : 'hidden',
}));

const getColorPickerStyles = ({ width }) => ({
  marginTop: 16,

  '.react-colorful__saturation': {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    order: 1,
    height: width,
    width,
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
    width,
  },

  '.react-colorful__hue-pointer, .react-colorful__alpha-pointer': {
    width: 20,
    height: 20,
  },
});

const makeStyledHexColorPicker = ({ width }) => styled(HexColorPicker)(getColorPickerStyles({ width }));
const makeStyledRgbaColorPicker = ({ width }) => styled(RgbaStringColorPicker)(getColorPickerStyles({ width }));

/**
 * This is a simplified version of Storybook's
 * `ColorControl` because that control exists
 * within a tooltip and that tooltip doesn't work
 * very well if it's inside another tooltip.
 * Why, Storybook, why? Separation, y'all.
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
  width = 224,
}) => {
  const handleChange = useCallback(color => onChange(color), [onChange]);

  const ColorPickerByFormat = useMemo(
    () => (format === 'rgba' ? makeStyledRgbaColorPicker({ width }) : makeStyledHexColorPicker({ width })),
    [format, width],
  );

  return (
    <Container width={width}>
      <InputSwatch
        aria-label="Toggle color picker"
        onClick={onToggleExpansion}
        role="button"
        tabIndex={0}
        title="Toggle color picker"
        value={value}
      />
      <StyledInput
        onChange={event => handleChange(event.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        value={value || ''}
      />
      {children && <RightButton>{children}</RightButton>}

      <CollapsibleContainer isVisible={isExpanded} width={width}>
        <ColorPickerByFormat color={value} height={width} onChange={handleChange} width={width} />

        {presetColors && (
          <Swatches>
            {presetColors.map(({ color, title }) => (
              <PresetSwatch
                aria-label={title}
                key={color}
                onClick={() => handleChange(color)}
                role="button"
                tabIndex={0}
                title={title}
                value={color}
              />
            ))}
          </Swatches>
        )}
      </CollapsibleContainer>
    </Container>
  );
};
