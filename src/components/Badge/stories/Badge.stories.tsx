import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Badge, BadgeProps } from '../Badge';

export default {
  title: 'Display/Badge',
  component: Badge,
  argTypes: {
    color: {
      options: ['primary', 'success', 'warning', 'danger', 'neutral'],
      control: { type: 'radio' },
      table: {
        category: 'Primary controls',
      },
    },
    pulsing: {
      table: {
        category: 'Primary controls',
      },
    },
    position: {
      options: [undefined, 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
      control: { type: 'select' },
      table: {
        category: 'Primary controls',
      },
    },
    shape: {
      options: ['point', 'marker', 'count', 'label'],
      control: { type: 'radio' },
      table: {
        category: 'Primary controls',
      },
    },

    contrast: {
      table: {
        category: 'Uncommon controls',
      },
    },
    outlined: {
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
      exclude: ['className', 'themeId'],
      sort: 'requiredFirst',
    },
    docs: {
      description: {
        component: 'A badge can display a count, a label or a simple marker.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = args => <Badge {...args} />;

const defaultArgs = {
  color: 'primary' as BadgeProps['color'],
  pulsing: false,
  shape: 'marker' as BadgeProps['shape'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Point = Template.bind({});
Point.args = {
  ...defaultArgs,
  shape: 'point',
};

export const Marker = Template.bind({});
Marker.args = {
  ...defaultArgs,
  shape: 'marker',
};

export const Count = Template.bind({});
Count.args = {
  ...defaultArgs,
  children: 99,
  shape: 'count',
};

export const Label = Template.bind({});
Label.args = {
  ...defaultArgs,
  children: 'Beta',
  shape: 'label',
};
