import { RainbowIcon } from ' ../../../src/icons/internal';
import addons from '@storybook/addons';
import { useGlobals } from '@storybook/api';
import { IconButton, TabsState, WithTooltipPure } from '@storybook/components';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { styled } from '@storybook/theming';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const [globals, updateGlobals] = useGlobals();
  const [currentAccentColors, setCurrentAccentColors] = useState(globals[PARAM_KEY] || getAccentColors() || {});
  const [isVisible, setIsVisible] = useState(false);

  // updating globals must be debounced because it's slow
  const debouncedUpdateGlobals = useRef();
  useEffect(() => {
    debouncedUpdateGlobals.current = debounce(accentColors => {
      updateGlobals({ [PARAM_KEY]: accentColors });
      addons.getChannel().emit(FORCE_RE_RENDER);
    }, 800);
  }, [updateGlobals]);

  const handleColorChange = useCallback(accentColors => {
    setCurrentAccentColors(accentColors);
    renderAccentColors(accentColors);

    debouncedUpdateGlobals.current(accentColors);
  }, []);

  // render the accent colors on load
  useEffect(() => {
    renderAccentColors(currentAccentColors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <IconButton active={hasAccentColors(currentAccentColors)} aria-label="Set custom accent colors">
        <RainbowIcon title="Set custom accent colors" />
      </IconButton>
    </WithTooltipPure>
  );
};
