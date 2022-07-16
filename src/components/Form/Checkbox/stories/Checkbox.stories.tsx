import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { FormComponentDemo } from '../../stories/helpers/FormComponentDemo';
import { Checkbox, CheckboxProps } from '../Checkbox';
import CheckboxDocumentation from './Checkbox.docs.mdx';

export default {
  title: 'Form/Checkbox',
  component: Checkbox,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },

    full: {
      table: {
        category: 'Appearance',
      },
    },
    reverse: {
      table: {
        category: 'Appearance',
      },
    },
    size: {
      table: {
        category: 'Appearance',
      },
    },
    validity: {
      options: ['danger', undefined],
      table: {
        category: 'Appearance',
      },
    },
    variant: {
      table: {
        category: 'Appearance',
      },
    },

    checked: {
      table: {
        category: 'Input',
      },
    },
    disabled: {
      table: {
        category: 'Input',
      },
    },
    id: {
      table: {
        category: 'Input',
      },
    },
    indeterminate: {
      table: {
        category: 'Input',
      },
    },
    name: {
      table: {
        category: 'Input',
      },
    },
    value: {
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
    inputStyle: {
      table: {
        category: 'Uncommon',
      },
    },
    labelProps: {
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
    unthemed: {
      table: {
        category: 'Uncommon',
      },
    },
  },
  decorators: [
    (Story, { args }) => (
      <FormComponentDemo initialValue={args.checked} property="checked" type="checkbox">
        {Story()}
      </FormComponentDemo>
    ),
  ],
  parameters: {
    controls: {
      exclude: ['persistEvents'],
      sort: 'requiredFirst',
    },
    docs: {
      page: CheckboxDocumentation,
    },
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = args => <Checkbox {...args} />;

const defaultArgs = {
  checked: false,
  children: 'Super fantastic label',
  contrast: false,
  disabled: false,
  full: false,
  indeterminate: false,
  reverse: false,
  size: 'large' as CheckboxProps['size'],
  unthemed: false,
  variant: 'primary' as CheckboxProps['variant'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Checkbox.test.js'],
};
*/

export const CheckedState = Template.bind({});
CheckedState.storyName = 'State: Checked';
CheckedState.args = {
  ...defaultArgs,
  checked: true,
};

export const UncheckedState = Template.bind({});
UncheckedState.storyName = 'State: Unchecked';
UncheckedState.args = {
  ...defaultArgs,
  checked: false,
};

export const IndeterminateState = Template.bind({});
IndeterminateState.storyName = 'State: Indeterminate';
IndeterminateState.args = {
  ...defaultArgs,
  checked: true,
  indeterminate: true,
};

export const PrimaryVariant = Template.bind({});
PrimaryVariant.storyName = 'Variant: Primary';
PrimaryVariant.args = {
  ...defaultArgs,
  checked: true,
  variant: 'primary',
};

export const SecondaryVariant = Template.bind({});
SecondaryVariant.storyName = 'Variant: Secondary';
SecondaryVariant.args = {
  ...defaultArgs,
  checked: true,
  variant: 'secondary',
};

export const MediumSize = Template.bind({});
MediumSize.storyName = 'Size: Medium';
MediumSize.args = {
  ...defaultArgs,
  checked: true,
  size: 'medium',
};

export const LargeSize = Template.bind({});
LargeSize.storyName = 'Size: Large';
LargeSize.args = {
  ...defaultArgs,
  checked: true,
  size: 'large',
};

export const XLargeSize = Template.bind({});
XLargeSize.storyName = 'Size: XLarge';
XLargeSize.args = {
  ...defaultArgs,
  checked: true,
  size: 'xlarge',
};

export const XXLargeSize = Template.bind({});
XXLargeSize.storyName = 'Size: 2XLarge';
XXLargeSize.args = {
  ...defaultArgs,
  checked: true,
  size: '2xlarge',
};

export const XXXLargeSize = Template.bind({});
XXXLargeSize.storyName = 'Size: 3XLarge';
XXXLargeSize.args = {
  ...defaultArgs,
  checked: true,
  size: '3xlarge',
};

export const XXXXLargeSize = Template.bind({});
XXXXLargeSize.storyName = 'Size: 4XLarge';
XXXXLargeSize.args = {
  ...defaultArgs,
  checked: true,
  size: '4xlarge',
};

export const XXXXXLargeSize = Template.bind({});
XXXXXLargeSize.storyName = 'Size: 5XLarge';
XXXXXLargeSize.args = {
  ...defaultArgs,
  checked: true,
  size: '5xlarge',
};

export const XXXXXXLargeSize = Template.bind({});
XXXXXXLargeSize.storyName = 'Size: 6XLarge';
XXXXXXLargeSize.args = {
  ...defaultArgs,
  checked: true,
  size: '6xlarge',
};

export const XXXXXXXLargeSize = Template.bind({});
XXXXXXXLargeSize.storyName = 'Size: 7XLarge';
XXXXXXXLargeSize.args = {
  ...defaultArgs,
  checked: true,
  size: '7xlarge',
};

export const XXXXXXXXLargeSize = Template.bind({});
XXXXXXXXLargeSize.storyName = 'Size: 8XLarge';
XXXXXXXXLargeSize.args = {
  ...defaultArgs,
  checked: true,
  size: '8xlarge',
};
