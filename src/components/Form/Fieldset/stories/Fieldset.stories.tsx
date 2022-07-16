import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Typography } from 'components/Typography';
import { Fieldset } from '../Fieldset';
import FieldsetDocumentation from './Fieldset.docs.mdx';

export default {
  title: 'Form/Fieldset',
  component: Fieldset,
  argTypes: {
    children: {
      control: { disable: true },
    },
    legend: {
      control: {
        type: 'text',
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
    contrast: {
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
      page: FieldsetDocumentation,
    },
  },
} as ComponentMeta<typeof Fieldset>;

const Template: ComponentStory<typeof Fieldset> = args => <Fieldset {...args} />;

const defaultArgs = {
  children: (
    <Typography size="large" variants="italic" volume="quietest">
      Form elements will go here
    </Typography>
  ),
  contrast: false,
  legend: 'Super awesome legend',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Fieldset.test.js'],
};
*/
