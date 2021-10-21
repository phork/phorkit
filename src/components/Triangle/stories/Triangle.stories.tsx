import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Typography } from 'components/Typography';
import { Triangle, TriangleProps } from '../Triangle';
import TriangleDocumentation from './Triangle.docs.mdx';

export default {
  title: 'Utilities/Triangle',
  component: Triangle,
  argTypes: {
    color: {
      control: {
        type: 'color',
      },
      category: 'Appearance',
    },
    position: {
      control: 'radio',
      category: 'Appearance',
    },
    size: {
      category: 'Appearance',
    },

    className: {
      control: {
        disable: true,
      },
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
  decorators: [
    Story => (
      <Typography<'div'> as="div" color="primary">
        {Story()}
      </Typography>
    ),
  ],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: TriangleDocumentation,
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Triangle>;

const Template: ComponentStory<typeof Triangle> = args => <Triangle {...args} />;

const defaultArgs = {
  color: 'currentColor',
  position: 'top' as TriangleProps['position'],
  size: 30,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
