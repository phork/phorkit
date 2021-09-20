import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Triangle, TriangleProps } from '../Triangle';
import TriangleDocumentation from './Triangle.docs.mdx';

export default {
  title: 'Utilities/Triangle',
  component: Triangle,
  argTypes: {
    color: {
      control: { type: 'color' },
      category: 'Appearance controls',
    },
    position: {
      control: 'radio',
      category: 'Appearance controls',
    },
    size: {
      category: 'Appearance controls',
    },

    className: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon controls',
      },
    },
    style: {
      table: {
        category: 'Uncommon controls',
      },
    },
    themeId: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon controls',
      },
    },
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: TriangleDocumentation,
      description: {
        component: 'A simple utility for building triangles that can be used for arrows.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Triangle>;

const Template: ComponentStory<typeof Triangle> = args => <Triangle {...args} />;

const defaultArgs = {
  color: '#0060ce',
  position: 'top' as TriangleProps['position'],
  size: 30,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
