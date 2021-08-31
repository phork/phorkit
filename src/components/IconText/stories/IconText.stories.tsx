import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Rhythm } from 'components/Rhythm';
import { BlobbrIcon } from '../../../icons/internal';
import { IconText } from '../IconText';

export default {
  title: 'Display/IconText',
  component: IconText,
  argTypes: {
    icon: {
      defaultValue: 'Medium',
      options: ['Small', 'Medium', 'Large'],
      mapping: {
        Small: <BlobbrIcon scale="small" />,
        Medium: <BlobbrIcon scale="medium" />,
        Large: <BlobbrIcon scale="large" />,
      },
      control: {
        labels: {
          Small: '<BlobbrIcon scale="small" />',
          Medium: '<BlobbrIcon scale="medium" />',
          Large: '<BlobbrIcon scale="large" />',
        },
      },
      table: {
        category: 'Primary controls',
      },
    },
    inline: {
      table: {
        category: 'Primary controls',
      },
    },
    reverse: {
      table: {
        category: 'Primary controls',
      },
    },
    text: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Primary controls',
      },
    },

    iconClassName: {
      table: {
        category: 'Uncommon controls',
      },
    },
    textClassName: {
      table: {
        category: 'Uncommon controls',
      },
    },
    style: {
      table: {
        category: 'Uncommon controls',
      },
    },
  },
  parameters: {
    controls: {
      exclude: ['className'],
      sort: 'requiredFirst',
    },
    docs: {
      description: {
        component: 'Displays some text with an icon before or after it.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof IconText>;

const Template: ComponentStory<typeof IconText> = args => <IconText {...args} />;

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
