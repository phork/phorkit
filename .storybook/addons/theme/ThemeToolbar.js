import { MoonIcon, SunIcon } from ' ../../../src/icons/internal';
import addons from '@storybook/addons';
import { useGlobals } from '@storybook/api';
import { IconButton } from '@storybook/components';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import React, { useCallback } from 'react';
import { getThemeId, setThemeId } from './utils';
import { PARAM_KEY } from './constants';

// this works with the classes defined in preview-body.html
const updateClassNames = (element, themeId) => {
  if (element) {
    if (themeId === 'dark') {
      element.classList.add('sbdocs-body-dark');
      element.classList.remove('sbdocs-body-light');
    } else {
      element.classList.add('sbdocs-body-light');
      element.classList.remove('sbdocs-body-dark');
    }
  }
};

const updateElementClasses = themeId => {
  const iframe = document.getElementById('storybook-preview-iframe');
  const iframeDocument = iframe && (iframe.contentDocument || iframe.contentWindow?.document);

  updateClassNames(iframeDocument?.querySelector('body'), themeId);
  updateClassNames(document.querySelector('body'), themeId);
};

// [TODO:sb] globals don't seem to be used by the docs addon so this uses local storage
export const ThemeToolbar = React.memo(() => {
  const [globals, updateGlobals] = useGlobals();
  const currentThemeId = globals[PARAM_KEY] || getThemeId();
  const isDarkTheme = currentThemeId === 'dark';

  const toggleThemeId = useCallback(() => {
    const newThemeId = isDarkTheme ? 'light' : 'dark';
    setThemeId(newThemeId);
    updateElementClasses(newThemeId);

    updateGlobals({ [PARAM_KEY]: newThemeId });
    addons.getChannel().emit(FORCE_RE_RENDER);
  }, [isDarkTheme]);

  const title = isDarkTheme ? 'Use the light theme' : 'Use the dark theme';

  return (
    <IconButton key="theme" title={title} onClick={() => toggleThemeId()}>
      {isDarkTheme ? <SunIcon title={title} /> : <MoonIcon title={title} />}
    </IconButton>
  );
});
