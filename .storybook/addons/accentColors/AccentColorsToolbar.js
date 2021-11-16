import { RainbowIcon } from ' ../../../src/icons/internal';
import addons from '@storybook/addons';
import { useGlobals } from '@storybook/api';
import { IconButton, TabsState, WithTooltipPure } from '@storybook/components';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { styled } from '@storybook/theming';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getAccentColors, hasAccentColors, renderAccentColors } from './utils';
import { AccentColorsCss } from './AccentColorsCss';
import { AccentColorsForm } from './AccentColorsForm';
import { presetColors, accentColorProps, accentColorMap, derivativeSources, colorGroups, PARAM_KEY } from './constants';

const SET_COLORS_WIDTH = 230;

// the popover shadow is too light to appear so we need to make our own
// see https://github.com/storybookjs/storybook/blob/v6.4.0-beta.33/lib/components/src/tooltip/Tooltip.tsx#L108-L111
const TooltipContainer = styled.div(
  ({ theme }) =>
    theme.base === 'dark' && {
      filter: 'drop-shadow(0px 5px 5px rgba(0,0,0,.2)) drop-shadow(0 1px 3px rgba(0,0,0,.5))',
    },
);

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
          <TooltipContainer>
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
          </TooltipContainer>
        );
      }}
      tooltipShown={isVisible}
      trigger="click"
    >
      <IconButton aria-label="Set custom accent colors" active={hasAccentColors(currentAccentColors)}>
        <RainbowIcon title="Set custom accent colors" />
      </IconButton>
    </WithTooltipPure>
  );
};
