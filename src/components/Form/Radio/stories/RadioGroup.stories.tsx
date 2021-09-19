import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import { RadioGroup, RadioGroupProps } from '../RadioGroup';
import RadioGroupDocumentation from './RadioGroup.docs.mdx';

export default {
  title: 'Form/RadioGroup',
  component: RadioGroup,
  argTypes: {
    radios: {
      table: {
        category: 'Appearance controls',
      },
    },
    layout: {
      table: {
        category: 'Appearance controls',
      },
    },
    legend: {
      control: { type: 'text' },
      table: {
        category: 'Appearance controls',
      },
    },
    size: {
      table: {
        category: 'Appearance controls',
      },
    },
    values: {
      table: {
        category: 'Appearance controls',
      },
    },

    variant: {
      table: {
        category: 'Appearance controls',
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
  decorators: [Story => <div style={{ maxWidth: 400 }}>{Story()}</div>],
  parameters: {
    controls: {
      exclude: ['className', 'ref', 'themeId'],
      sort: 'requiredFirst',
    },
    docs: {
      page: RadioGroupDocumentation,
      description: {
        component: 'A group of radios in a fieldset with a legend.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof RadioGroup>;

const Template: ComponentStory<typeof RadioGroup> = args => <RadioGroup {...args} />;

const defaultArgs = {
  radios: [
    {
      id: 'radio-group-item1',
      name: 'radio-group-item1',
      value: 'one',
      label: 'Super fantastic label one',
    },
    {
      id: 'radio-group-item2',
      name: 'radio-group-item2',
      value: 'two',
      label: 'Super fantastic label two',
    },
    {
      id: 'radio-group-item3',
      name: 'radio-group-item3',
      value: 'three',
      label: 'Super fantastic label three',
    },
  ],
  contrast: false,
  layout: 'inline' as RadioGroupProps['layout'],
  legend: 'Super fantastic legend',
  size: 'medium' as RadioGroupProps['size'],
  value: 'one',
  variant: 'primary' as RadioGroupProps['variant'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const InlineLayout = Template.bind({});
InlineLayout.storyName = 'Layout: Inline';
InlineLayout.args = {
  ...defaultArgs,
  layout: 'inline',
};

export const StackedLayout = Template.bind({});
StackedLayout.storyName = 'Layout: Stacked';
StackedLayout.args = {
  ...defaultArgs,
  layout: 'stacked',
};

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  ...defaultArgs,
  legend: (
    <Rhythm mb={1}>
      <Typography as="legend" variants="medium-caps">
        Super fantastic legend
      </Typography>
    </Rhythm>
  ),
};
