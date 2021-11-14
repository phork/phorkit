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
    hidden: true,
    formula: src => Color(src).lighten(0.25).hex(),
  },
  {
    property: '--phork-accent-color-D10',
    label: 'Accent color D10',
    description: 'This is a slightly darkened version of the accent color used for things like button active states.',
    hidden: true,
    formula: src => Color(src).darken(0.125).hex(),
  },
  {
    property: '--phork-accent-color-L30',
    label: 'Accent color L30',
    description: 'This the accent color lightened by a factor of 3. This is used for the Paper border in dark mode.',
    hidden: true,
    formula: src => Color(src).lighten(0.75).hex(),
  },
  {
    property: '--phork-accent-color-D30',
    label: 'Accent color D30',
    description: 'This the accent color darkened by a factor of 3. This is used for the Paper borders in light mode.',
    hidden: true,
    formula: src => Color(src).lighten(0.375).hex(),
  },
  {
    property: '--phork-accent-color-shade',
    label: 'Accent color shade',
    description:
      'This is approximately the accent color at an opacity of .1 flattened against the extreme palette background color.',
    hidden: true,
    formula: src => Color(src).alpha(0.15).mix(Color(themes[themeId]['extreme-palette-background-color'])).hex(),
  },
  {
    property: '--phork-accent-color-O5',
    label: 'Accent color O5',
    description:
      'This is the accent color with an opacity of .05. This is used for auto-filled form background colors.',
    hidden: true,
    formula: src => Color(src).alpha(0.05).rgb().string(),
    format: 'rgba',
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

const Unbutton = styled.button({
  appearance: 'button',
  background: 'transparent',
  border: 'none',
  color: 'currentColor',
  cursor: 'pointer',
  outline: 'none',
  opacity: 0.7,
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
});

export const AccentColorsToolbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [colorPickerExpansion, setColorPickerExpansion] = useState({});

  const [globals, updateGlobals] = useGlobals();
  const currentAccentColors = useMemo(() => globals[PARAM_KEY] || getAccentColors() || {}, [globals]);

  const baseAccentColor = currentAccentColors['--phork-accent-color'];
  const previousBaseAccentColor = useRef();

  // saving the colors must happen before forcing a re-render
  const setCurrentAccentColors = useCallback(
    (accentColors, transient) => {
      previousBaseAccentColor.current = currentAccentColors['--phork-accent-color'];

      if (!transient) {
        hasAccentColors(accentColors) ? setAccentColors(accentColors) : clearAccentColors();
      }

      updateGlobals({ [PARAM_KEY]: accentColors });
      addons.getChannel().emit(FORCE_RE_RENDER);
    },
    [currentAccentColors, updateGlobals],
  );

  const reset = useCallback(() => {
    setCurrentAccentColors({});
  }, [setCurrentAccentColors]);

  const updateAccentColor = useCallback(
    (property, color) => {
      setCurrentAccentColors({ ...currentAccentColors, [property]: color });
    },
    [currentAccentColors, setCurrentAccentColors],
  );

  const generateColor = useCallback(
    ({ property, formula, src }) => {
      if (isValidColor(src)) {
        updateAccentColor(property, formula(src));
      }
    },
    [updateAccentColor],
  );

  // update the hidden formulaic colors
  const updateHiddenColors = useCallback(
    src => {
      if (src && isValidColor(src)) {
        const generatedAccentColors = accentColorProps.reduce(
          (acc, { property, hidden, formula }) => {
            if (formula && hidden) {
              acc[property] = formula(src);
            }
            return acc;
          },
          { ...currentAccentColors },
        );

        setCurrentAccentColors(generatedAccentColors);
      }
    },
    [currentAccentColors, setCurrentAccentColors],
  );

  // if the main color has changed update the hidden formulaic colors
  useEffect(() => {
    if (!isExpanded && baseAccentColor !== previousBaseAccentColor.current) {
      updateHiddenColors(baseAccentColor);
    }
  }, [isExpanded, baseAccentColor, updateHiddenColors]);

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
                  {accentColorProps.map(
                    ({ property, label, description, hidden, formula, format }) =>
                      (isExpanded || !hidden) && (
                        <div
                          key={property}
                          style={{
                            borderBottom: colorPickerExpansion[property]
                              ? `1px solid ${themes[themeId]['primary-palette-border-color']}`
                              : 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            margin: 12,
                            marginBottom: 16,
                          }}
                        >
                          <div
                            style={{
                              alignItems: 'center',
                              display: 'flex',
                              flexDirection: 'row',
                              marginBottom: 8,
                            }}
                          >
                            <div>{label}</div>
                            {description && (
                              <Unbutton
                                aria-label="Toggle description"
                                onClick={() =>
                                  setIsDescriptionVisible(current => ({ ...current, [property]: !current[property] }))
                                }
                                style={{ marginLeft: 4 }}
                                title="Toggle description"
                              >
                                <HelpIcon size={12} style={{ float: 'left' }} />
                              </Unbutton>
                            )}
                          </div>
                          {isDescriptionVisible[property] && (
                            <div style={{ marginBottom: 16, maxWidth: 224, fontSize: 10, lineHeight: '12px' }}>
                              {description}
                            </div>
                          )}
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
                            width={230}
                          >
                            {formula && (
                              <Unbutton
                                aria-label="Generate color"
                                disabled={!baseAccentColor}
                                onClick={() => generateColor({ property, formula, src: baseAccentColor })}
                                style={{ borderRadius: '100%', marginTop: 6 }}
                                title="Generate color"
                              >
                                <RefreshIcon size={14} style={{ float: 'left' }} />
                              </Unbutton>
                            )}
                          </ColorPicker>
                        </div>
                      ),
                  )}
                </ScrollArea>
                <div
                  style={{
                    alignItems: 'center',
                    borderTop: `1px solid ${themes[themeId]['primary-palette-border-color']}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 8,
                    padding: 12,
                  }}
                >
                  <Button outline small onClick={() => reset()}>
                    Clear colors
                  </Button>

                  <Button
                    small
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{
                      fontWeight: 'normal',
                      marginLeft: 12,
                      outline: 'none',
                      padding: 0,
                      color: themes[themeId]['color-accent'],
                    }}
                  >
                    {isExpanded ? 'Show less' : 'Show more'}
                  </Button>
                </div>
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
