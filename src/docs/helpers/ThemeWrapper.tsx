import React, { useCallback, useContext, useLayoutEffect } from 'react';
import { useColorMode } from 'theme-ui';
import { SequentialVariant, Theme } from 'types';
import { ThemeContext } from 'context/Theme';
import { renderFromProp, RenderFromPropElement } from 'utils/renderFromProp';
import { MoonIcon } from 'icons/internal/MoonIcon';
import { SunIcon } from 'icons/internal/SunIcon';
import { IconButton } from 'components/Button';

const variables = require('../../postcss/vars/index');

export interface ThemeWrapperProps {
  children: RenderFromPropElement | RenderFromPropElement[];
  contrast?: boolean;
  style?: React.CSSProperties;
  variant?: SequentialVariant;
  withThemeId?: boolean;
}

export function ThemeWrapper({
  children,
  contrast,
  style,
  variant: initVariant = 'primary',
  withThemeId,
}: ThemeWrapperProps): React.ReactElement {
  const [colorMode, setColorMode] = useColorMode<Theme>();
  const { themeId, toggleThemeId } = useContext(ThemeContext);

  const updateThemeIds = useCallback(() => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  }, [colorMode, setColorMode]);

  // use useLayoutEffect because its blocking prevents the page from flashing the light theme
  useLayoutEffect(() => {
    toggleThemeId(colorMode);
  }, [colorMode, toggleThemeId]);

  const variant = contrast ? 'contrast' : initVariant;
  const backgroundColor = variables[`${themeId}-${variant}-background-color`];
  const color = variables[`${themeId}-${variant}-text-color`];
  const content = withThemeId ? renderFromProp(children, { themeId }) : children;

  return (
    <div
      style={{
        backgroundColor: contrast ? `var(--contrast-color, ${backgroundColor})` : backgroundColor,
        color,
        margin: '-20px',
        padding: '20px 40px',
        borderRadius: '4px',
        ...style,
      }}
    >
      <IconButton
        style={{ position: 'absolute', top: '-30px', right: '10px' }}
        onClick={updateThemeIds}
        aria-label="Toggle theme"
        themeId="light"
        color="neutral"
      >
        {themeId === 'dark' ? <SunIcon scale="medium" /> : <MoonIcon scale="medium" />}
      </IconButton>

      {content}
    </div>
  );
}
