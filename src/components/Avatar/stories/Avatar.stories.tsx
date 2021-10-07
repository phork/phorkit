import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Avatar, AvatarProps } from '../Avatar';
import AvatarDocumentation from './Avatar.docs.mdx';

export default {
  title: 'Display/Avatar',
  component: Avatar,
  argTypes: {
    actionable: {
      table: {
        category: 'Appearance',
      },
    },
    color: {
      options: ['primary', 'neutral'],
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    size: {
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge', '2xlarge', '3xlarge'],
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },

    imgSrc: {
      table: {
        category: 'Content',
      },
    },
    initials: {
      table: {
        category: 'Content',
      },
    },

    as: {
      table: {
        category: 'Uncommon',
      },
    },
    className: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    contrast: {
      table: {
        category: 'Uncommon',
      },
    },
    style: {
      table: {
        category: 'Uncommon',
      },
    },
    themeId: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    unthemed: {
      table: {
        category: 'Uncommon',
      },
    },
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: AvatarDocumentation,
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = args => <Avatar {...args} />;

const defaultArgs = {
  actionable: false,
  color: 'primary' as AvatarProps['color'],
  contrast: false,
  initials: 'EC',
  size: 'medium' as AvatarProps['size'],
  unthemed: false,
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
