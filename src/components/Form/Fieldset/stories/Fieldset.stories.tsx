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
      control: { type: 'text' },
    },

    className: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon controls',
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
      page: FieldsetDocumentation,
      description: {
        component: 'The fieldset is used to group together several form elements.',
      },
    },
    layout: 'centered',
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