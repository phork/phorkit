import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { ArrowLeftIcon } from 'icons/ArrowLeftIcon';
import { ArrowRightIcon } from 'icons/ArrowRightIcon';
import { FormComponentDemo } from '../../stories/helpers/FormComponentDemo';
import { Textbox, TextboxProps } from '../Textbox';
import TextboxDocumentation from './Textbox.docs.mdx';

export default {
  title: 'Form/Textbox',
  component: Textbox,
  argTypes: {
    clearable: {
      table: {
        category: 'Appearance',
      },
    },
    centered: {
      table: {
        category: 'Appearance',
      },
    },
    label: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Appearance',
      },
    },
    placeholder: {
      table: {
        category: 'Appearance',
      },
    },
    size: {
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    transitional: {
      table: {
        category: 'Appearance',
      },
    },
    transparent: {
      table: {
        category: 'Appearance',
      },
    },
    validity: {
      options: ['success', 'warning', 'danger', undefined],
      table: {
        category: 'Appearance',
      },
    },
    variant: {
      table: {
        category: 'Appearance',
      },
    },
    width: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Appearance',
      },
    },

    iconAfter: {
      options: ['small', 'medium', 'large'],
      control: {
        labels: {
          small: '<ArrowLeftIcon scale="small" />',
          medium: '<ArrowLeftIcon scale="medium" />',
          large: '<ArrowLeftIcon scale="large" />',
        },
      },
      table: {
        category: 'Icons',
      },
    },
    iconAfterActionable: {
      table: {
        category: 'Icons',
      },
    },
    iconAfterClassName: {
      control: {
        disable: true,
      },
      table: {
        category: 'Icons',
      },
    },
    iconBefore: {
      options: ['small', 'medium', 'large'],
      control: {
        labels: {
          small: '<ArrowRightIcon scale="small" />',
          medium: '<ArrowRightIcon scale="medium" />',
          large: '<ArrowRightIcon scale="large" />',
        },
      },
      table: {
        category: 'Icons',
      },
    },
    iconBeforeActionable: {
      table: {
        category: 'Icons',
      },
    },
    iconBeforeClassName: {
      control: {
        disable: true,
      },
      table: {
        category: 'Icons',
      },
    },

    disabled: {
      table: {
        category: 'Input',
      },
    },
    formattedValue: {
      table: {
        category: 'Input',
      },
    },
    id: {
      table: {
        category: 'Input',
      },
    },
    inputSize: {
      table: {
        category: 'Input',
      },
    },
    max: {
      table: {
        category: 'Input',
      },
    },
    maxLength: {
      table: {
        category: 'Input',
      },
    },
    min: {
      table: {
        category: 'Input',
      },
    },
    name: {
      table: {
        category: 'Input',
      },
    },
    readOnly: {
      table: {
        category: 'Input',
      },
    },
    required: {
      table: {
        category: 'Input',
      },
    },
    step: {
      table: {
        category: 'Input',
      },
    },
    type: {
      table: {
        category: 'Input',
      },
    },
    value: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Input',
      },
    },

    onAnimationStart: {
      table: {
        category: 'Actions',
      },
    },
    onBlur: {
      table: {
        category: 'Actions',
      },
    },
    onChange: {
      table: {
        category: 'Actions',
      },
    },
    onClear: {
      table: {
        category: 'Actions',
      },
    },
    onFocus: {
      table: {
        category: 'Actions',
      },
    },
    onInputBlur: {
      table: {
        category: 'Actions',
      },
    },
    onInputFocus: {
      table: {
        category: 'Actions',
      },
    },
    onKeyDown: {
      table: {
        category: 'Actions',
      },
    },
    onSubmit: {
      table: {
        category: 'Actions',
      },
    },

    alwaysShowFormatting: {
      table: {
        category: 'Uncommon',
      },
    },
    alwaysTriggerBlur: {
      table: {
        category: 'Uncommon',
      },
    },
    alwaysTriggerFocus: {
      table: {
        category: 'Uncommon',
      },
    },
    alwaysUseFormatting: {
      table: {
        category: 'Uncommon',
      },
    },
    autoFocus: {
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
    contrast: {
      table: {
        category: 'Uncommon',
      },
    },
    formboxProps: {
      table: {
        category: 'Uncommon',
      },
    },
    inputClassName: {
      table: {
        category: 'Uncommon',
      },
    },
    inputStyle: {
      table: {
        category: 'Uncommon',
      },
    },
    inputWidth: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Uncommon',
      },
    },
    persistEvents: {
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
    visuallyFocused: {
      table: {
        category: 'Uncommon',
      },
    },
  },
  decorators: [
    (Story, { args }) => (
      <FormComponentDemo initialValue={args.value} property="value" type="textbox">
        {Story()}
      </FormComponentDemo>
    ),
  ],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: TextboxDocumentation,
    },
  },
} as ComponentMeta<typeof Textbox>;

const Template: ComponentStory<
  (
    args: Omit<TextboxProps, 'iconAfter' | 'iconBefore'> & {
      iconAfter?: 'small' | 'medium' | 'large';
      iconBefore?: 'small' | 'medium' | 'large';
    },
  ) => ReturnType<typeof Textbox>
> = ({ iconAfter, iconBefore, ...args }) => (
  <Textbox
    iconAfter={iconAfter && <ArrowRightIcon scale={iconAfter} />}
    iconBefore={iconBefore && <ArrowLeftIcon scale={iconBefore} />}
    {...args}
  />
);

const defaultArgs = {
  alwaysShowFormatting: false,
  alwaysTriggerBlur: false,
  alwaysTriggerFocus: false,
  alwaysUseFormatting: false,
  autoFocus: false,
  centered: false,
  clearable: false,
  contrast: false,
  disabled: false,
  iconBeforeActionable: false,
  iconAfterActionable: false,
  label: 'Super fantastic label',
  persistEvents: false,
  readOnly: false,
  required: false,
  size: 'large' as TextboxProps['size'],
  transitional: false,
  transparent: false,
  type: 'text' as TextboxProps['type'],
  unthemed: false,
  value: 'Hello world',
  variant: 'underline' as TextboxProps['variant'],
  visuallyFocused: false,
  width: '100%',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Textbox.test.js'],
};
*/

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
