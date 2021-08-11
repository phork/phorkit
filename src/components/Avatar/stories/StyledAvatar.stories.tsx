import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { StyledAvatar, StyledAvatarProps } from '../StyledAvatar';
import avatarStory from './Avatar.stories';

export default {
  ...avatarStory,
  title: 'Display/Avatar/StyledAvatar',
  component: StyledAvatar,
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
    ...avatarStory.argTypes,
  },
} as ComponentMeta<typeof StyledAvatar>;

const Template: ComponentStory<typeof StyledAvatar> = args => <StyledAvatar {...args} />;

const defaultArgs = {
  actionable: false,
  backgroundColor: '#556270',
  color: undefined,
  initials: 'EC',
  size: 'medium' as StyledAvatarProps['size'],
  textColor: '#fff',
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
