import { themes } from '.../../../src/config/themes';
import { Button, ScrollArea } from '@storybook/components';
import { styled } from '@storybook/theming';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { getThemeId } from '../theme/utils';
import {
  clearAccentColors,
  hasAccentColors,
  hasValidSources,
  isColorInputHidden,
  isValidColor,
  setAccentColors,
} from './utils';
import { AccentColorFormInput } from './AccentColorFormInput';

const themeId = getThemeId();

const Notification = styled.div({
  background: themes[themeId]['primary-palette-background-color'],
  borderBottom: `1px solid ${themes[themeId]['primary-palette-border-color']}`,
  borderTop: `1px solid ${themes[themeId]['primary-palette-border-color']}`,
  color: themes[themeId]['primary-palette-quiet-color'],
  fontSize: 11,
  fontWeight: 'bold',
  lineHeight: '16px',
  marginBottom: 24,
  marginTop: 24,
  padding: 12,
});

const TextButton = styled(Button)({
  color: themes[themeId]['color-accent'],
  fontWeight: 'normal',
  marginLeft: 12,
  outline: 'none',
  padding: 0,
});

const Footer = styled.div({
  alignItems: 'center',
  borderTop: `1px solid ${themes[themeId]['primary-palette-border-color']}`,
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 8,
  padding: 12,
});

export const AccentColorsForm = ({
  accentColorMap,
  accentColorProps,
  colorGroups,
  currentAccentColors,
  derivativeSources,
  onChange,
  presetColors,
  width,
}) => {
  const [visibleColorPicker, setVisibleColorPicker] = useState();
  const [groupExpansion, setGroupExpansion] = useState({});
  const previousAccentColors = useRef(currentAccentColors);

  const toggleColorPickerVisible = useCallback(
    property => {
      setVisibleColorPicker(visibleColorPicker === property ? undefined : property);
    },
    [visibleColorPicker],
  );

  const setCurrentAccentColors = useCallback(
    (accentColors, transient) => {
      previousAccentColors.current = currentAccentColors;

      if (!transient) {
        hasAccentColors(accentColors) ? setAccentColors(accentColors) : clearAccentColors();
      }

      onChange?.(accentColors);
    },
    [currentAccentColors],
  );

  // reset all accent colors back to empty
  const reset = useCallback(() => {
    setCurrentAccentColors({});
  }, [setCurrentAccentColors]);

  // update a single accent color
  const updateAccentColor = useCallback(
    (property, color) => {
      setCurrentAccentColors({ ...currentAccentColors, [property]: color });
    },
    [currentAccentColors, setCurrentAccentColors],
  );

  // generate and update an accent color if all its sources are valid
  const generateColor = useCallback(
    ({ property, formula, sourceColors }) => {
      if (hasValidSources(property, sourceColors)) {
        updateAccentColor(property, formula(sourceColors));
      }
    },
    [updateAccentColor],
  );

  // update the colors derived from the property color if they're hidden or forced
  const updateDerivedColors = useCallback(
    (property, force) => {
      const src = currentAccentColors[property];
      if (src && isValidColor(src)) {
        const generatedAccentColors = accentColorProps.reduce(
          (acc, { property: derivativeProperty, derivedFrom, formula }) => {
            if (force || isColorInputHidden(derivativeProperty, groupExpansion) || !acc[derivativeProperty]) {
              if (formula && derivedFrom?.includes(property)) {
                acc[derivativeProperty] = formula(currentAccentColors);
              }
            }
            return acc;
          },
          { ...currentAccentColors },
        );

        setCurrentAccentColors(generatedAccentColors);
      }
    },
    [currentAccentColors, setCurrentAccentColors, groupExpansion],
  );

  // if a derivative source color has changed update the derived colors
  useEffect(() => {
    derivativeSources.forEach(property => {
      if (currentAccentColors[property] !== previousAccentColors.current[property]) {
        updateDerivedColors(property);
      }
    });
  }, [currentAccentColors, previousAccentColors, updateDerivedColors]);

  return (
    <React.Fragment>
      <ScrollArea vertical style={{ maxHeight: 'calc(100vh - 220px' }}>
        {colorGroups.map(
          ({ id, properties, notification, hidden }) =>
            (groupExpansion[id] || !hidden) && (
              <React.Fragment key={properties}>
                {notification && (
                  <Notification>
                    <div style={{ maxWidth: width, paddingLeft: 4, paddingRight: 4 }}>{notification}</div>
                  </Notification>
                )}

                {properties.map(property => {
                  if (accentColorMap[property] !== undefined && accentColorProps[accentColorMap[property]]) {
                    const { label, description, formula, format } = accentColorProps[accentColorMap[property]];

                    const onColorChange = color => updateAccentColor(property, color);

                    const onColorGenerate = formula
                      ? () => generateColor({ property, formula, sourceColors: currentAccentColors })
                      : undefined;

                    return (
                      <AccentColorFormInput
                        description={description}
                        format={format}
                        isColorPickerVisible={visibleColorPicker === property}
                        isGenerateDisabled={!hasValidSources(property, currentAccentColors)}
                        key={property}
                        label={label}
                        onChange={onColorChange}
                        onGenerate={onColorGenerate}
                        presetColors={presetColors}
                        toggleColorPickerVisible={() => toggleColorPickerVisible(property)}
                        value={currentAccentColors[property]}
                        width={width}
                      />
                    );
                  }
                })}
              </React.Fragment>
            ),
        )}
      </ScrollArea>
      <Footer>
        <Button outline small onClick={reset}>
          Clear colors
        </Button>

        <TextButton
          small
          onClick={() => setGroupExpansion(current => ({ ...current, 'accent-derived': !current['accent-derived'] }))}
        >
          {groupExpansion['accent-derived'] ? 'Show less' : 'Show more'}
        </TextButton>
      </Footer>
    </React.Fragment>
  );
};
