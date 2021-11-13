import { addons, types } from '@storybook/addons';
import React from 'react';
import { AccentColorsToolbar } from './AccentColorsToolbar';
import { ADDON_ID } from './constants';

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'Accent colors',
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => <AccentColorsToolbar />,
  });
});
