import { RainbowIcon } from ' ../../../src/icons/internal';
import addons from '@storybook/addons';
import { useGlobals } from '@storybook/api';
import { IconButton, TabsState, WithTooltipPure } from '@storybook/components';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getAccentColors, hasAccentColors, renderAccentColors } from './utils';
import { AccentColorsCss } from './AccentColorsCss';
import { AccentColorsForm } from './AccentColorsForm';
import { presetColors, accentColorProps, accentColorMap, derivativeSources, colorGroups, PARAM_KEY } from './constants';

const SET_COLORS_WIDTH = 230;

export const AccentColorsToolbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [globals, updateGlobals] = useGlobals();
  const currentAccentColors = useMemo(() => globals[PARAM_KEY] || getAccentColors() || {}, [globals]);

  // saving the colors must happen before forcing a re-render
  const handleColorChange = useCallback(
    accentColors => {
      updateGlobals({ [PARAM_KEY]: accentColors });
      addons.getChannel().emit(FORCE_RE_RENDER);
    },
    [updateGlobals],
  );

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
              <AccentColorsForm
                accentColorMap={accentColorMap}
                accentColorProps={accentColorProps}
                colorGroups={colorGroups}
                currentAccentColors={currentAccentColors}
                derivativeSources={derivativeSources}
                onChange={handleColorChange}
                presetColors={presetColors}
                width={SET_COLORS_WIDTH}
              />
            </div>
            <div id="output" title="Get CSS">
              <AccentColorsCss accentColorProps={accentColorProps} currentAccentColors={currentAccentColors} />
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
