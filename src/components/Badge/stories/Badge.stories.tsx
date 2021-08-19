import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Badge, BadgeProps } from '../Badge';
import BadgeDocumentation from './Badge.docs.mdx';

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
      page: BadgeDocumentation,
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

export const Primary = Template.bind({});
Primary.storyName = 'Color: Primary';
Primary.args = {
  ...defaultArgs,
  color: 'primary',
};

export const Success = Template.bind({});
Success.storyName = 'Color: Success';
Success.args = {
  ...defaultArgs,
  color: 'success',
};

export const Warning = Template.bind({});
Warning.storyName = 'Color: Warning';
Warning.args = {
  ...defaultArgs,
  color: 'warning',
};

export const Danger = Template.bind({});
Danger.storyName = 'Color: Danger';
Danger.args = {
  ...defaultArgs,
  color: 'danger',
};

export const Neutral = Template.bind({});
Neutral.storyName = 'Color: Neutral';
Neutral.args = {
  ...defaultArgs,
  color: 'neutral',
};

export const Point = Template.bind({});
Point.storyName = 'Shape: Point';
Point.args = {
  ...defaultArgs,
  shape: 'point',
};

export const Marker = Template.bind({});
Marker.storyName = 'Shape: Marker';
Marker.args = {
  ...defaultArgs,
  shape: 'marker',
};

export const Count = Template.bind({});
Count.storyName = 'Shape: Count';
Count.args = {
  ...defaultArgs,
  children: 99,
  shape: 'count',
};

export const Label = Template.bind({});
Label.storyName = 'Shape: Label';
Label.args = {
  ...defaultArgs,
  children: 'Beta',
  shape: 'label',
};

export const Pulsing = Template.bind({});
Pulsing.args = {
  ...defaultArgs,
  pulsing: true,
};
