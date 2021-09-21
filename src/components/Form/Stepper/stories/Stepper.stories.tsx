import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { FormComponentDemo } from '../../stories/helpers/FormComponentDemo';
import { Stepper, StepperProps } from '../Stepper';
import StepperDocumentation from './Stepper.docs.mdx';

export default {
  title: 'Form/Stepper',
  component: Stepper,
  argTypes: {
    inputWidth: {
      control: { type: 'text' },
      table: {
        category: 'Appearance controls',
      },
    },
    label: {
      table: {
        category: 'Appearance controls',
      },
    },
    max: {
      table: {
        category: 'Appearance controls',
      },
    },
    min: {
      table: {
        category: 'Appearance controls',
      },
    },
    placeholder: {
      table: {
        category: 'Appearance controls',
      },
    },
    size: {
      control: { type: 'radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    step: {
      table: {
        category: 'Appearance controls',
      },
    },
    transparent: {
      table: {
        category: 'Appearance controls',
      },
    },
    validity: {
      options: ['success', 'warning', 'danger', undefined],
      table: {
        category: 'Appearance controls',
      },
    },
    variant: {
      table: {
        category: 'Appearance controls',
      },
    },

    disabled: {
      table: {
        category: 'State controls',
      },
    },
    formattedValue: {
      table: {
        category: 'State controls',
      },
    },
    inputSize: {
      table: {
        category: 'State controls',
      },
    },
    maxLength: {
      table: {
        category: 'State controls',
      },
    },
    readOnly: {
      table: {
        category: 'State controls',
      },
    },
    required: {
      table: {
        category: 'State controls',
      },
    },
    value: {
      table: {
        category: 'State controls',
      },
    },

    onAnimationStart: {
      table: {
        category: 'Action controls',
      },
    },
    onBlur: {
      table: {
        category: 'Action controls',
      },
    },
    onChange: {
      table: {
        category: 'Action controls',
      },
    },
    onClear: {
      table: {
        category: 'Action controls',
      },
    },
    onFocus: {
      table: {
        category: 'Action controls',
      },
    },
    onInputBlur: {
      table: {
        category: 'Action controls',
      },
    },
    onInputFocus: {
      table: {
        category: 'Action controls',
      },
    },
    onKeyDown: {
      table: {
        category: 'Action controls',
      },
    },
    onSubmit: {
      table: {
        category: 'Action controls',
      },
    },

    alwaysShowFormatting: {
      table: {
        category: 'Uncommon controls',
      },
    },
    alwaysTriggerBlur: {
      table: {
        category: 'Uncommon controls',
      },
    },
    alwaysTriggerFocus: {
      table: {
        category: 'Uncommon controls',
      },
    },
    alwaysUseFormatting: {
      table: {
        category: 'Uncommon controls',
      },
    },
    autoFocus: {
      table: {
        category: 'Uncommon controls',
      },
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
    formboxProps: {
      table: {
        category: 'Uncommon controls',
      },
    },
    inputClassName: {
      table: {
        category: 'Uncommon controls',
      },
    },
    inputStyle: {
      table: {
        category: 'Uncommon controls',
      },
    },
    persistEvents: {
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
    unthemed: {
      table: {
        category: 'Uncommon controls',
      },
    },
    visuallyFocused: {
      table: {
        category: 'Uncommon controls',
      },
    },
  },
  decorators: [
    (Story, { args }) => (
      <FormComponentDemo initialValue={args.value} property="value" type="stepper">
        {Story()}
      </FormComponentDemo>
    ),
  ],
  parameters: {
    controls: {
      exclude: ['ref', 'translations'],
      sort: 'requiredFirst',
    },
    docs: {
      page: StepperDocumentation,
      description: {
        component: 'A numeric textbox input that has increment and decrement icons.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Stepper>;

const Template: ComponentStory<typeof Stepper> = args => <Stepper {...args} />;

const defaultArgs = {
  alwaysShowFormatting: false,
  alwaysTriggerBlur: false,
  alwaysTriggerFocus: false,
  alwaysUseFormatting: false,
  autoFocus: false,
  contrast: false,
  disabled: false,
  inputWidth: 'auto',
  max: 999,
  min: 1,
  persistEvents: false,
  placeholder: 0,
  readOnly: false,
  required: false,
  size: 'large' as StepperProps['size'],
  step: 1,
  transparent: false,
  unthemed: false,
  variant: 'underline' as StepperProps['variant'],
  visuallyFocused: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const UnderlineVariant = Template.bind({});
UnderlineVariant.storyName = 'Variant: Underline';
UnderlineVariant.args = {
  ...defaultArgs,
  variant: 'underline',
};

export const FilledVariant = Template.bind({});
FilledVariant.storyName = 'Variant: Filled';
FilledVariant.args = {
  ...defaultArgs,
  variant: 'filled',
};

export const OutlineVariant = Template.bind({});
OutlineVariant.storyName = 'Variant: Outline';
OutlineVariant.args = {
  ...defaultArgs,
  variant: 'outline',
};

export const PillVariant = Template.bind({});
PillVariant.storyName = 'Variant: Pill';
PillVariant.args = {
  ...defaultArgs,
  variant: 'pill',
};

export const MinimalVariant = Template.bind({});
MinimalVariant.storyName = 'Variant: Minimal';
MinimalVariant.args = {
  ...defaultArgs,
  variant: 'minimal',
};

export const MediumSize = Template.bind({});
MediumSize.storyName = 'Size: Medium';
MediumSize.args = {
  ...defaultArgs,
  size: 'medium',
};

export const LargeSize = Template.bind({});
LargeSize.storyName = 'Size: Large';
LargeSize.args = {
  ...defaultArgs,
  size: 'large',
};

export const XLargeSize = Template.bind({});
XLargeSize.storyName = 'Size: XLarge';
XLargeSize.args = {
  ...defaultArgs,
  size: 'xlarge',
};

export const XXLargeSize = Template.bind({});
XXLargeSize.storyName = 'Size: 2XLarge';
XXLargeSize.args = {
  ...defaultArgs,
  size: '2xlarge',
};

export const XXXLargeSize = Template.bind({});
XXXLargeSize.storyName = 'Size: 3XLarge';
XXXLargeSize.args = {
  ...defaultArgs,
  size: '3xlarge',
};

export const XXXXLargeSize = Template.bind({});
XXXXLargeSize.storyName = 'Size: 4XLarge';
XXXXLargeSize.args = {
  ...defaultArgs,
  size: '4xlarge',
};

export const XXXXXLargeSize = Template.bind({});
XXXXXLargeSize.storyName = 'Size: 5XLarge';
XXXXXLargeSize.args = {
  ...defaultArgs,
  size: '5xlarge',
};

export const XXXXXXLargeSize = Template.bind({});
XXXXXXLargeSize.storyName = 'Size: 6XLarge';
XXXXXXLargeSize.args = {
  ...defaultArgs,
  size: '6xlarge',
};

export const XXXXXXXLargeSize = Template.bind({});
XXXXXXXLargeSize.storyName = 'Size: 7XLarge';
XXXXXXXLargeSize.args = {
  ...defaultArgs,
  size: '7xlarge',
};

export const XXXXXXXXLargeSize = Template.bind({});
XXXXXXXXLargeSize.storyName = 'Size: 8XLarge';
XXXXXXXXLargeSize.args = {
  ...defaultArgs,
  size: '8xlarge',
};
