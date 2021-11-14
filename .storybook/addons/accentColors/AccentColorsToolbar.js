import { themes } from '.../../../src/config/themes';
import { RainbowIcon, RefreshIcon, HelpIcon } from ' ../../../src/icons/internal';
import addons from '@storybook/addons';
import { useGlobals } from '@storybook/api';
import { Button, IconButton, ScrollArea, TabsState, WithTooltipPure } from '@storybook/components';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { styled } from '@storybook/theming';
import * as Color from 'color';
import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { getThemeId } from '../theme/utils';
import { getAccentColors, setAccentColors, clearAccentColors, isValidColor } from './utils';
import { ColorPicker } from './ColorPicker';
import { PARAM_KEY } from './constants';

const SET_COLORS_WIDTH = 230;

const themeId = getThemeId();

const presetColors = [
  { color: themes[themeId]['color-P05'], title: 'P05' },
  { color: themes[themeId]['color-P10'], title: 'P10' },
  { color: themes[themeId]['color-P15'], title: 'P15' },
  { color: themes[themeId]['color-P20'], title: 'P20' },
  { color: themes[themeId]['color-P25'], title: 'P25' },
  { color: themes[themeId]['color-P30'], title: 'P30' },
  { color: themes[themeId]['color-P35'], title: 'P35' },
  { color: themes[themeId]['color-P40'], title: 'P40' },
  { color: themes[themeId]['color-P45'], title: 'P45' },
  { color: themes[themeId]['color-P50'], title: 'P50' },
  { color: themes[themeId]['color-P55'], title: 'P55' },
  { color: themes[themeId]['color-P60'], title: 'P60' },
  { color: themes[themeId]['color-P65'], title: 'P65' },
];

const accentColorProps = [
  {
    property: '--phork-accent-color',
    label: 'Accent color',
    description:
      'The accent color is the main color used in the components and generally defines the theme of the application.',
  },
  {
    property: '--phork-accent-color-contrast',
    label: 'Accent contrast',
    description:
      'The contrast color should be visible against the accent color. For example the accent color will be the background and the contrast color will be the text color.',
  },
  {
    property: '--phork-accent-color-L10',
    label: 'Accent color L10',
    description: 'This is a slightly lightened version of the accent color used for things like button hover states.',
    derivedFrom: ['--phork-accent-color'],
    formula: src => Color(src['--phork-accent-color']).lighten(0.25).hex(),
  },
  {
    property: '--phork-accent-color-D10',
    label: 'Accent color D10',
    description: 'This is a slightly darkened version of the accent color used for things like button active states.',
    derivedFrom: ['--phork-accent-color'],
    formula: src => Color(src['--phork-accent-color']).darken(0.125).hex(),
  },
  {
    property: '--phork-accent-color-L30',
    label: 'Accent color L30',
    description: 'This the accent color lightened by a factor of 3. This is used for the Paper border in dark mode.',
    derivedFrom: ['--phork-accent-color'],
    formula: src => Color(src['--phork-accent-color']).lighten(0.75).hex(),
  },
  {
    property: '--phork-accent-color-D30',
    label: 'Accent color D30',
    description: 'This the accent color darkened by a factor of 3. This is used for the Paper borders in light mode.',
    derivedFrom: ['--phork-accent-color'],
    formula: src => Color(src['--phork-accent-color']).lighten(0.375).hex(),
  },
  {
    property: '--phork-accent-color-shade',
    label: 'Accent color shade',
    description:
      'This is approximately the accent color at an opacity of .1 flattened against the extreme palette background color.',
    derivedFrom: ['--phork-accent-color'],
    formula: src =>
      Color(src['--phork-accent-color'])
        .alpha(0.15)
        .mix(Color(themes[themeId]['extreme-palette-background-color']))
        .hex(),
  },
  {
    property: '--phork-accent-color-O5',
    label: 'Accent color O5',
    description:
      'This is the accent color with an opacity of .05. This is used for auto-filled form background colors.',
    derivedFrom: ['--phork-accent-color'],
    formula: src => Color(src['--phork-accent-color']).alpha(0.05).rgb().string(),
    format: 'rgba',
  },
];

const accentColorMap = accentColorProps.reduce((acc, { property }, index) => {
  acc[property] = index;
  return acc;
}, {});

const derivativeSources = [
  ...new Set(
    accentColorProps.reduce((acc, { derivedFrom }) => {
      derivedFrom && acc.push(...derivedFrom);
      return acc;
    }, []),
  ),
];

const colorGroups = [
  {
    id: 'primary',
    properties: ['--phork-accent-color', '--phork-accent-color-contrast'],
  },
  {
    id: 'accent-derived',
    notification:
      'The following colors will be automatically generated from the accent color when this panel is closed.',
    properties: [
      '--phork-accent-color-L10',
      '--phork-accent-color-D10',
      '--phork-accent-color-L30',
      '--phork-accent-color-D30',
      '--phork-accent-color-shade',
      '--phork-accent-color-O5',
    ],
    hidden: true,
  },
];

const setElementStyles = (element, accentColors) => {
  accentColorProps.forEach(({ property }) => {
    if (accentColors?.[property]) {
      element?.style.setProperty(property, accentColors[property]);
    } else {
      element?.style.removeProperty(property);
    }
  });
};

const renderAccentColors = accentColors => {
  document.querySelectorAll('iframe').forEach(iframe => {
    const iframeDocument = iframe && (iframe.contentDocument || iframe.contentWindow?.document);
    setElementStyles(iframeDocument?.querySelector('body'), accentColors);
  });

  setElementStyles(document.querySelector('body'), accentColors);
};

const hasAccentColors = accentColors => !!accentColors && Object.values(accentColors).filter(Boolean).length > 0;

const hasValidSources = (property, accentColors) => {
  const { derivedFrom } = accentColorProps[accentColorMap[property]];
  return derivedFrom.every(src => isValidColor(accentColors?.[src]));
};

const isColorInputHidden = (property, groupExpansion) => {
  const groups = colorGroups.filter(({ properties }) => properties?.includes(property));
  return groups.every(({ id, hidden }) => hidden && !groupExpansion[id]);
};

const ColorContainer = styled.div(({ bordered }) => ({
  borderBottom: bordered ? `1px solid ${themes[themeId]['primary-palette-border-color']}` : 'none',
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
  lineHeight: '12px',
  marginBottom: 16,
  maxWidth: 224,
});

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

const Unbutton = styled.button(({ disabled }) => ({
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
    color: themes[themeId]['color-accent'],
  },

  '&:active': {
    opacity: 1,
  },

  '&:disabled': {
    opacity: 0.3,
  },
}));

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

export const AccentColorsToolbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState({});
  const [groupExpansion, setGroupExpansion] = useState({});
  const [colorPickerExpansion, setColorPickerExpansion] = useState({});

  const [globals, updateGlobals] = useGlobals();
  const currentAccentColors = useMemo(() => globals[PARAM_KEY] || getAccentColors() || {}, [globals]);
  const previousAccentColors = useRef(currentAccentColors);

  // saving the colors must happen before forcing a re-render
  const setCurrentAccentColors = useCallback(
    (accentColors, transient) => {
      previousAccentColors.current = currentAccentColors;

      if (!transient) {
        hasAccentColors(accentColors) ? setAccentColors(accentColors) : clearAccentColors();
      }

      updateGlobals({ [PARAM_KEY]: accentColors });
      addons.getChannel().emit(FORCE_RE_RENDER);
    },
    [currentAccentColors, updateGlobals],
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

  // when the colors change update the view
  useEffect(() => {
    renderAccentColors(currentAccentColors);
  }, [currentAccentColors]);

  return (
    <WithTooltipPure
      onVisibilityChange={setIsVisible}
      placement="top"
      tooltip={() => {
        return (
          <TabsState initial="input">
            <div id="input" title="Set colors">
              <React.Fragment>
                <ScrollArea vertical style={{ maxHeight: 'calc(100vh - 220px' }}>
                  {colorGroups.map(
                    ({ id, properties, notification, hidden }) =>
                      (groupExpansion[id] || !hidden) && (
                        <React.Fragment key={properties}>
                          {notification && (
                            <Notification>
                              <div style={{ maxWidth: SET_COLORS_WIDTH, paddingLeft: 4, paddingRight: 4 }}>
                                {notification}
                              </div>
                            </Notification>
                          )}

                          {properties.map(property => {
                            if (accentColorMap[property] !== undefined && accentColorProps[accentColorMap[property]]) {
                              const { label, description, formula, format } =
                                accentColorProps[accentColorMap[property]];

                              return (
                                <ColorContainer bordered={colorPickerExpansion[property]} key={property}>
                                  <ColorLabelContainer>
                                    <div>{label}</div>
                                    {description && (
                                      <Unbutton
                                        aria-label="Toggle description"
                                        onClick={() =>
                                          setIsDescriptionVisible(current => ({
                                            ...current,
                                            [property]: !current[property],
                                          }))
                                        }
                                        style={{ marginLeft: 4 }}
                                        title="Toggle description"
                                      >
                                        <HelpIcon size={12} style={{ float: 'left' }} title="More information" />
                                      </Unbutton>
                                    )}
                                  </ColorLabelContainer>
                                  {isDescriptionVisible[property] && <ColorDescription>{description}</ColorDescription>}
                                  <ColorPicker
                                    format={format}
                                    isExpanded={colorPickerExpansion[property]}
                                    onChange={color => updateAccentColor(property, color)}
                                    onFocus={e => e.target.select()}
                                    onToggleExpansion={() =>
                                      setColorPickerExpansion(current => ({ [property]: !current[property] }))
                                    }
                                    placeholder="Choose color..."
                                    presetColors={presetColors}
                                    value={currentAccentColors[property]}
                                    width={SET_COLORS_WIDTH}
                                  >
                                    {formula && (
                                      <Unbutton
                                        aria-label="Generate color"
                                        disabled={!hasValidSources(property, currentAccentColors)}
                                        onClick={() =>
                                          generateColor({ property, formula, sourceColors: currentAccentColors })
                                        }
                                        style={{ borderRadius: '100%', marginTop: 6 }}
                                        title="Generate color"
                                      >
                                        <RefreshIcon size={14} style={{ float: 'left' }} title="Generate color" />
                                      </Unbutton>
                                    )}
                                  </ColorPicker>
                                </ColorContainer>
                              );
                            }
                          })}
                        </React.Fragment>
                      ),
                  )}
                </ScrollArea>
                <Footer>
                  <Button outline small onClick={() => reset()}>
                    Clear colors
                  </Button>

                  <TextButton
                    small
                    onClick={() =>
                      setGroupExpansion(current => ({ ...current, 'accent-derived': !current['accent-derived'] }))
                    }
                  >
                    {groupExpansion['accent-derived'] ? 'Show less' : 'Show more'}
                  </TextButton>
                </Footer>
              </React.Fragment>
            </div>
            <div id="output" title="Get CSS">
              {hasAccentColors(currentAccentColors) ? (
                <pre>
                  <code>
                    :root &#123;{'\n'}
                    {accentColorProps.map(
                      ({ property }) =>
                        currentAccentColors[property] && `  ${property}: ${currentAccentColors[property]};\n`,
                    )}
                    &#125;
                  </code>
                </pre>
              ) : (
                <div style={{ margin: 12 }}>You're using the default colors. No extra CSS is necessary.</div>
              )}
            </div>
          </TabsState>
        );
      }}
      tooltipShown={isVisible}
      trigger="click"
    >
      <IconButton active={hasAccentColors(currentAccentColors)}>
        <RainbowIcon title="Set custom accent colors" />
      </IconButton>
    </WithTooltipPure>
  );
};
