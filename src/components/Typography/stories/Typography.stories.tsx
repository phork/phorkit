import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Typography, TypographyProps } from '../Typography';
import TypographyDocumentation from './Typography.docs.mdx';

export default {
  title: 'Utilities/Typography',
  component: Typography,
  argTypes: {
    align: {
      control: { type: 'inline-radio' },
    },
    children: {
      control: { type: 'text' },
    },
    color: {
      control: { type: 'radio' },
    },
    heading: {
      control: { type: 'radio' },
    },
    variants: {
      options: [
        'italic',
        'underline',
        'blackout',
        'blackout-rounded',
        'spoiler',
        'truncated',
        'uppercase',
        'lowercase',
        'unset-case',
        'letter-spacing-comfy',
        'line-height-smash',
        'line-height-comfy',
        'line-height-normal',
        'space-after',
        'space-before',
        'no-select',
        'no-wrap',
        'wrap',
        'reset',
        'medium-caps',
        'small-caps',
        'xsmall-caps',
      ],
      control: { type: 'check' },
    },
    volume: {
      control: { type: 'inline-radio' },
    },
    weight: {
      control: { type: 'radio' },
    },

    as: {
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
  },
  parameters: {
    controls: {
      exclude: ['className', 'themeId'],
      sort: 'requiredFirst',
    },
    docs: {
      page: TypographyDocumentation,
      description: {
        component: 'A utility to add one or more styles to a text element.',
      },
    },
    layout: 'padded',
  },
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = ({ as, ...args }) => (
  <Typography<'div'> as="div" {...(args as TypographyProps<'div'>)} />
);

const defaultArgs = {
  children: 'The quick brown fox jumped over the lazy dog.',
  fullWidth: false,
  reset: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
