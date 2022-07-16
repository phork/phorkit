import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Mutable } from 'types/utils';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import { FormComponentDemo } from '../../stories/helpers/FormComponentDemo';
import { CheckboxGroup, CheckboxGroupProps } from '../CheckboxGroup';
import { checkboxes } from './helpers/options';
import CheckboxGroupDocumentation from './CheckboxGroup.docs.mdx';

export default {
  title: 'Form/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    layout: {
      table: {
        category: 'Appearance',
      },
    },
    legend: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Appearance',
      },
    },
    size: {
      table: {
        category: 'Appearance',
      },
    },
    variant: {
      table: {
        category: 'Appearance',
      },
    },

    checkboxes: {
      table: {
        category: 'Input',
      },
    },
    values: {
      table: {
        category: 'Input',
      },
    },

    onChange: {
      table: {
        category: 'Actions',
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
  decorators: [
    (Story, { args }) => (
      <FormComponentDemo initialValue={args.values} property="values" type="checkbox">
        {Story()}
      </FormComponentDemo>
    ),
  ],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: CheckboxGroupDocumentation,
    },
  },
} as ComponentMeta<typeof CheckboxGroup>;

const Template: ComponentStory<typeof CheckboxGroup> = args => <CheckboxGroup {...args} />;

const defaultArgs = {
  checkboxes: checkboxes as Mutable<typeof checkboxes>,
  contrast: false,
  layout: 'inline' as CheckboxGroupProps['layout'],
  legend: 'Super fantastic legend',
  size: 'medium' as CheckboxGroupProps['size'],
  values: ['one'],
  variant: 'primary' as CheckboxGroupProps['variant'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['CheckboxGroup.test.js'],
};
*/

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
CustomLabel.storyName = 'Custom label';
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

export const NoLabel = Template.bind({});
NoLabel.storyName = 'No label';
NoLabel.args = {
  ...defaultArgs,
  layout: 'stacked',
  legend: undefined,
};
