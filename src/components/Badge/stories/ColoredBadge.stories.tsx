import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { ThemeColorIds } from '../../../config/themes';
import { getPrimaryColorIds } from '../../../stories/helpers/utils';
import { ColoredBadge, ColoredBadgeProps } from '../ColoredBadge';
import badgeStory from './Badge.stories';

export default {
  ...badgeStory,
  title: 'Display/Badge/ColoredBadge',
  component: ColoredBadge,
  argTypes: {
    colorId: {
      options: getPrimaryColorIds('light'),
      control: { type: 'select' },
      table: {
        category: 'Color controls',
      },
    },
    ...badgeStory.argTypes,
  },
} as ComponentMeta<typeof ColoredBadge>;

const Template: ComponentStory<typeof ColoredBadge> = args => <ColoredBadge {...args} />;

const defaultArgs = {
  children: 99,
  color: undefined,
  colorId: 'P60' as ThemeColorIds,
  pulsing: false,
  shape: 'count' as ColoredBadgeProps['shape'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

Default.argTypes = {
  color: { table: { disable: true } },
  contrast: { table: { disable: true } },
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
