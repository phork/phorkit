import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Typography, TypographyProps } from '../Typography';
import TypographyDocumentation from './Typography.docs.mdx';

export default {
  title: 'Utilities/Typography',
  component: Typography,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },

    align: {
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    color: {
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    fullWidth: {
      table: {
        category: 'Appearance',
      },
    },
    heading: {
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    reset: {
      table: {
        category: 'Appearance',
      },
    },
    size: {
      table: {
        category: 'Appearance',
      },
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
      control: {
        type: 'check',
      },
      table: {
        category: 'Appearance',
      },
    },
    volume: {
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    weight: {
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },

    as: {
      control: {
        disable: true,
      },
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
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: TypographyDocumentation,
    },
    layout: 'padded',
  },
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = ({ as, ...args }) => (
  <Typography<'div'> as="div" color="primary" {...(args as TypographyProps<'div'>)} />
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

/*
Default.parameters = {
  jest: ['Typography.test.js'],
};
*/
