import { themes } from '.../../../src/config/themes';
import { RainbowIcon, RefreshIcon } from ' ../../../src/icons/internal';
import addons from '@storybook/addons';
import { useGlobals } from '@storybook/api';
import { Button, ColorControl, IconButton, ScrollArea, TabsState, WithTooltip } from '@storybook/components';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import * as Color from 'color';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useLayoutEffect, useState, useRef } from 'react';
import { getThemeId } from '../theme/utils';
import { getAccentColors, setAccentColors, clearAccentColors } from './utils';
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
  },
  {
    property: '--phork-accent-color-contrast',
    label: 'Accent contrast',
  },
  {
    property: '--phork-accent-color-L10',
    label: 'Accent color L10',
    hidden: true,
    formula: src => Color(src).lighten(0.25).hex(),
  },
  {
    property: '--phork-accent-color-L30',
    label: 'Accent color L30',
    hidden: true,
    formula: src => Color(src).lighten(0.75).hex(),
  },
  {
    property: '--phork-accent-color-D10',
    label: 'Accent color D10',
    hidden: true,
    formula: src => Color(src).darken(0.125).hex(),
  },
  {
    property: '--phork-accent-color-D30',
    label: 'Accent color D30',
    hidden: true,
    formula: src => Color(src).lighten(0.375).hex(),
  },
  {
    property: '--phork-accent-color-shade',
    label: 'Accent color shade',
    hidden: true,
    formula: src => Color(src).alpha(0.15).mix(Color(themes[themeId]['extreme-palette-background-color'])).hex(),
  },
  {
    property: '--phork-accent-color-O5',
    label: 'Accent color O5',
    hidden: true,
    formula: src => Color(src).alpha(0.05).hsl().round().string(),
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

export const AccentColorsToolbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const debouncedUpdateAccentColor = useRef();
  const handleColorChange = debouncedUpdateAccentColor.current;
  useEffect(() => {
    debouncedUpdateAccentColor.current = debounce(updateAccentColor, 300, { leading: true });
  }, [updateAccentColor]);

  const generateColor = useCallback(
    ({ property, formula, src }) => {
      updateAccentColor(property, formula(src));
    },
    [updateAccentColor],
  );

  // update the hidden formulaic colors
  const updateHiddenColors = useCallback(
    src => {
      if (src) {
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

  // if the main color has changed update the hidden forumulaic colors
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
    <WithTooltip
      placement="top"
      tooltip={() => {
        return (
          <TabsState initial="input">
            <div id="input" title="Set colors">
              <React.Fragment>
                <ScrollArea vertical style={{ maxHeight: 'calc(100vh - 180px' }}>
                  {accentColorProps.map(
                    ({ property, label, hidden, formula }) =>
                      (isExpanded || !hidden) && (
                        <div
                          key={`${property}-${currentAccentColors[property]}`}
                          style={{ display: 'flex', flexDirection: 'column', margin: 12, marginBottom: 16 }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginBottom: 8,
                            }}
                          >
                            {label}
                            {formula && (
                              <Button
                                containsIcon
                                outline
                                small
                                disabled={!baseAccentColor}
                                onClick={() => generateColor({ property, formula, src: baseAccentColor })}
                                style={{ padding: 4 }}
                                title="Generate color"
                              >
                                <RefreshIcon size={10} />
                              </Button>
                            )}
                          </div>
                          <ColorControl
                            name={label}
                            onChange={color => handleColorChange(property, color)}
                            presetColors={presetColors}
                            value={currentAccentColors[property]}
                          />
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
                    style={{ fontWeight: 'normal', marginLeft: 12, padding: 0, color: themes[themeId]['color-accent'] }}
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
      trigger="click"
    >
      <IconButton active={hasAccentColors(currentAccentColors)}>
        <RainbowIcon title="Set custom accent colors" />
      </IconButton>
    </WithTooltip>
  );
};
