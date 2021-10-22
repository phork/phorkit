import { addons, types } from '@storybook/addons';
import React from 'react';
import { ThemeToolbar } from './ThemeToolbar';
import { ADDON_ID } from './constants';

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'Theme',
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => <ThemeToolbar />,
  });
});
