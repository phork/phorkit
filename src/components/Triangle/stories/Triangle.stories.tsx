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
  size: undefined,
  color: undefined,
  style: {
    '--triangle-size': '30px',
    '--triangle-color': 'currentColor',
  } as React.CSSProperties,
};

/*
Default.parameters = {
  jest: ['Triangle.test.js'],
};
*/

export const TopPosition = Template.bind({});
TopPosition.args = {
  ...defaultArgs,
  position: 'top',
};

export const BottomPosition = Template.bind({});
BottomPosition.args = {
  ...defaultArgs,
  position: 'bottom',
};

export const LeftPosition = Template.bind({});
LeftPosition.args = {
  ...defaultArgs,
  position: 'left',
};

export const RightPosition = Template.bind({});
RightPosition.args = {
  ...defaultArgs,
  position: 'right',
};

export const TopLeftPosition = Template.bind({});
TopLeftPosition.args = {
  ...defaultArgs,
  position: 'top-left',
};

export const TopRightPosition = Template.bind({});
TopRightPosition.args = {
  ...defaultArgs,
  position: 'top-right',
};

export const BottomLeftPosition = Template.bind({});
BottomLeftPosition.args = {
  ...defaultArgs,
  position: 'bottom-left',
};

export const BottomRightPosition = Template.bind({});
BottomRightPosition.args = {
  ...defaultArgs,
  position: 'bottom-right',
};
