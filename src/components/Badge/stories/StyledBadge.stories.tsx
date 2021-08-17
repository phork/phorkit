import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { StyledBadge, StyledBadgeProps } from '../StyledBadge';
import badgeStory from './Badge.stories';

export default {
  ...badgeStory,
  title: 'Display/Badge/StyledBadge',
  component: StyledBadge,
  argTypes: {
    backgroundColor: {
      table: {
        category: 'Styled controls',
      },
    },
    textColor: {
      table: {
        category: 'Styled controls',
      },
    },
    ...badgeStory.argTypes,
  },
} as ComponentMeta<typeof StyledBadge>;

const Template: ComponentStory<typeof StyledBadge> = args => <StyledBadge {...args} />;

const defaultArgs = {
  backgroundColor: '#556270',
  children: 99,
  color: undefined,
  shape: 'count' as StyledBadgeProps['shape'],
  textColor: '#fff',
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
