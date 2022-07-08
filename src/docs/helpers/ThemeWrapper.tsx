import React, { useCallback, useContext, useLayoutEffect } from 'react';
import { useColorMode } from 'theme-ui';
import { SequentialVariant, Theme } from 'types';
import { ThemeContext } from 'context/Theme';
import { isValidRenderElement, renderFromProp, RenderFromPropElement } from 'utils/renderFromProp';
import { MoonIcon } from 'icons/internal/MoonIcon';
import { SunIcon } from 'icons/internal/SunIcon';
import { IconButton } from 'components/Button';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const variables = require('../../postcss/vars/index');

type RenderFromPropProps = { themeId?: Theme };

type CommonThemeWrapperProps = {
  contrast?: boolean;
  style?: React.CSSProperties;
  variant?: SequentialVariant;
};

type ThemeWrapperPropsWithThemeId = {
  children: RenderFromPropElement<RenderFromPropProps>;
  withThemeId: true;
};

type ThemeWrapperPropsWithChildren = {
  children: React.ReactChild | React.ReactFragment;
  withThemeId?: false;
};

export type ThemeWrapperProps = CommonThemeWrapperProps &
  (ThemeWrapperPropsWithThemeId | ThemeWrapperPropsWithChildren);

export function ThemeWrapper({
  children,
  contrast = false,
  style,
  variant: initVariant,
  withThemeId,
  ...props
}: ThemeWrapperProps): JSX.Element {
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
  const backgroundColor = variant ? variables[`${themeId}-${variant}-palette-background-color`] : 'transparent';
  const color = variant ? variables[`${themeId}-${variant}-palette-text-color`] : 'currentColor';

  const content = withThemeId
    ? (isValidRenderElement<RenderFromPropProps>(children) &&
        renderFromProp<RenderFromPropProps>(children, { themeId })) ||
      null
    : children;

  return (
    <div
      style={
        {
          backgroundColor: contrast ? `var(--phork-contrast-color, ${backgroundColor})` : backgroundColor,
          color,
          margin: '-20px',
          padding: '20px',
          borderRadius: '4px',
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <IconButton<'button'>
        aria-label="Toggle theme"
        as="button"
        color="neutral"
        onClick={updateThemeIds}
        style={{ position: 'absolute', top: '-30px', right: '10px' }}
        themeId="light"
      >
        {themeId === 'dark' ? <SunIcon scale="medium" /> : <MoonIcon scale="medium" />}
      </IconButton>

      {content}
    </div>
  );
}

ThemeWrapper.displayName = 'ThemeWrapper';
