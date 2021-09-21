import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { BlobbrIcon } from 'icons/internal';
import { Rhythm } from 'components/Rhythm';
import { IconText, IconTextProps } from '../IconText';

export default {
  title: 'Display/IconText',
  component: IconText,
  argTypes: {
    icon: {
      options: ['small', 'medium', 'large'],
      control: {
        labels: {
          small: '<BlobbrIcon scale="small" />',
          medium: '<BlobbrIcon scale="medium" />',
          large: '<BlobbrIcon scale="large" />',
        },
      },
      table: {
        category: 'Appearance',
      },
    },
    inline: {
      table: {
        category: 'Appearance',
      },
    },
    reverse: {
      table: {
        category: 'Appearance',
      },
    },
    text: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Appearance',
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
    iconClassName: {
      table: {
        category: 'Uncommon',
      },
    },
    textClassName: {
      table: {
        category: 'Uncommon',
      },
    },
    style: {
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
      description: {
        component: 'A combination of some text with an icon before or after it.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof IconText>;

const Template: ComponentStory<
  (args: Omit<IconTextProps, 'icon'> & { icon: 'small' | 'medium' | 'large' }) => ReturnType<typeof IconText>
> = ({ icon = 'medium', ...args }) => <IconText icon={<BlobbrIcon scale={icon} />} {...args} />;

const defaultArgs = {
  inline: false,
  reverse: false,
  text: 'Hello world',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const InlineReverse = Template.bind({});
InlineReverse.args = {
  ...defaultArgs,
  inline: true,
  reverse: true,
};

export const Spaced = Template.bind({});
Spaced.args = {
  ...defaultArgs,
  text: <Rhythm ml={2}>Hello world</Rhythm>,
};
