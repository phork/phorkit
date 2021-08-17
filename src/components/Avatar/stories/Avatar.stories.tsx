import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Avatar, AvatarProps } from '../Avatar';

export default {
  title: 'Display/Avatar',
  component: Avatar,
  argTypes: {
    actionable: {
      table: {
        category: 'Primary controls',
      },
    },
    color: {
      options: ['primary', 'neutral'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Primary controls',
      },
    },
    size: {
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge', '2xlarge', '3xlarge'],
      control: { type: 'radio' },
      table: {
        category: 'Primary controls',
      },
    },

    as: {
      table: {
        category: 'Uncommon controls',
      },
    },
    contrast: {
      table: {
        category: 'Uncommon controls',
      },
    },
    style: {
      table: {
        category: 'Uncommon controls',
      },
    },
    unthemed: {
      table: {
        category: 'Uncommon controls',
      },
    },
  },
  parameters: {
    controls: {
      exclude: ['className', 'themeId', 'translations'],
      sort: 'requiredFirst',
    },
    docs: {
      description: {
        component: 'An avatar represents a user as a picture or initials.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = args => <Avatar {...args} />;

const defaultArgs = {
  actionable: false,
  color: 'primary' as AvatarProps['color'],
  initials: 'EC',
  size: 'medium' as AvatarProps['size'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Initials = Template.bind({});
Initials.args = {
  ...defaultArgs,
};

export const Image = Template.bind({});
Image.args = {
  ...defaultArgs,
  imgSrc: '/images/avatar.jpg',
};