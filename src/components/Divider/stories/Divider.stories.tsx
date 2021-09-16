import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Divider, DividerProps } from '../Divider';
import DividerDocumentation from './Divider.docs.mdx';

export default {
  title: 'Utilities/Divider',
  component: Divider,
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
      table: {
        category: 'Primary controls',
      },
    },
    variant: {
      control: { type: 'radio' },
      table: {
        category: 'Primary controls',
      },
    },
    volume: {
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
  decorators: [
    (Story, { args: { orientation } }) => (
      <div style={{ [orientation === 'vertical' ? 'height' : 'width']: 300 }}>{Story()}</div>
    ),
  ],
  parameters: {
    controls: {
      exclude: ['className', 'themeId'],
      sort: 'requiredFirst',
    },
    docs: {
      page: DividerDocumentation,
      description: {
        component: 'A divider is a horizontal or vertical line.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = args => <Divider {...args} />;

const defaultArgs = {
  variant: 'primary' as DividerProps['variant'],
  orientation: 'horizontal' as DividerProps['orientation'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const PrimaryVariant = Template.bind({});
PrimaryVariant.storyName = 'Variant: Primary';
PrimaryVariant.args = {
  ...defaultArgs,
  variant: 'primary',
};

export const SecondaryVariant = Template.bind({});
SecondaryVariant.storyName = 'Variant: Secondary';
SecondaryVariant.args = {
  ...defaultArgs,
  variant: 'secondary',
};

export const TertiaryVariant = Template.bind({});
TertiaryVariant.storyName = 'Variant: Tertiary';
TertiaryVariant.args = {
  ...defaultArgs,
  variant: 'tertiary',
};

export const Vertical = Template.bind({});
Vertical.args = {
  ...defaultArgs,
  orientation: 'vertical',
};
