import { IconButton } from 'components/Button';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useLayoutEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useColorMode } from 'theme-ui';
import { ThemeContext } from 'context/Theme';
import { renderFromProp } from 'utils/renderFromProp';
import { LightOffIcon } from 'icons/internal/LightOffIcon';
import { LightOnIcon } from 'icons/internal/LightOnIcon';
import { renderPropType } from './propTypes';

const variables = require('../../postcss/vars/index');

export function ThemeWrapper({ children, contrast, style, variant: initVariant, withThemeId }) {
  const [colorMode, setColorMode] = useColorMode();
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
        style={{ position: 'absolute', top: '-42px', right: '0' }}
        onClick={updateThemeIds}
        aria-label="Toggle theme"
        themeId="light"
        color="neutral"
      >
        {themeId === 'dark' ? <LightOnIcon size={28} /> : <LightOffIcon size={28} />}
      </IconButton>

      {content}
    </div>
  );
}

ThemeWrapper.defaultProps = {
  children: undefined,
  contrast: false,
  style: undefined,
  variant: 'primary',
  withThemeId: false,
};

ThemeWrapper.propTypes = {
  children: renderPropType,
  contrast: PropTypes.bool,
  style: PropTypes.object,
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  withThemeId: PropTypes.bool,
};
