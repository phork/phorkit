import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { ThemeColorIds } from '../../../config/themes';
import { ColoredAvatar, ColoredAvatarProps } from '../ColoredAvatar';
import avatarStory from './Avatar.stories';

export default {
  ...avatarStory,
  title: 'Display/Avatar/ColoredAvatar',
  component: ColoredAvatar,
  argTypes: {
    color: {
      table: {
        category: 'Color controls',
      },
    },
    ...avatarStory.argTypes,
  },
} as ComponentMeta<typeof ColoredAvatar>;

const Template: ComponentStory<typeof ColoredAvatar> = args => <ColoredAvatar {...args} />;

const defaultArgs = {
  actionable: false,
  colorId: 'P30' as ThemeColorIds,
  color: undefined,
  initials: 'EC',
  size: 'medium' as ColoredAvatarProps['size'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

Default.argTypes = {
  as: { table: { disable: true } },
  color: { table: { disable: true } },
  contrast: { table: { disable: true } },
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
