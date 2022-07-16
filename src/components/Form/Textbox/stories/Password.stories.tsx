import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { CheckIcon } from 'icons/internal/CheckIcon';
import { HelpIcon } from 'icons/internal/HelpIcon';
import { TagIcon } from 'icons/internal/TagIcon';
import { FormComponentDemo } from '../../stories/helpers/FormComponentDemo';
import { Password, PasswordProps } from '../Password';
import PasswordDocumentation from './Password.docs.mdx';

export default {
  title: 'Form/Password',
  component: Password,
  argTypes: {
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

    iconHide: {
      options: ['check', undefined],
      control: {
        labels: {
          check: '<CheckIcon />',
          undefined: 'Default',
        },
      },
      table: {
        category: 'Toggle icons',
      },
    },
    iconHideSize: {
      table: {
        category: 'Toggle icons',
      },
    },
    iconShow: {
      options: ['help', undefined],
      control: {
        labels: {
          help: '<HelpIcon />',
          undefined: 'Default',
        },
      },
      table: {
        category: 'Toggle icons',
      },
    },
    iconShowSize: {
      table: {
        category: 'Toggle icons',
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
          small: '<TagIcon scale="small" />',
          medium: '<TagIcon scale="medium" />',
          large: '<TagIcon scale="large" />',
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
    id: {
      table: {
        category: 'Input',
      },
    },
    initialType: {
      table: {
        category: 'Input',
      },
    },
    inputSize: {
      table: {
        category: 'Input',
      },
    },
    maxLength: {
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
      <FormComponentDemo initialValue={args.value} property="value" type="password">
        {Story()}
      </FormComponentDemo>
    ),
  ],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: PasswordDocumentation,
    },
  },
} as ComponentMeta<typeof Password>;

const Template: ComponentStory<
  (
    args: Omit<PasswordProps, 'iconBefore' | 'iconShow' | 'iconHide'> & {
      iconBefore: 'small' | 'medium' | 'large';
      iconShow?: 'help';
      iconHide?: 'check';
    },
  ) => ReturnType<typeof Password>
> = ({ iconHide, iconHideSize, iconShow, iconShowSize, iconBefore, ...args }) => (
  <Password
    iconBefore={iconBefore && <TagIcon scale={iconBefore} />}
    iconHide={iconHide && CheckIcon}
    iconShow={iconShow && HelpIcon}
    {...args}
  />
);

const defaultArgs = {
  alwaysTriggerBlur: false,
  alwaysTriggerFocus: false,
  autoFocus: false,
  contrast: false,
  disabled: false,
  iconBeforeActionable: false,
  initialType: 'password' as PasswordProps['initialType'],
  label: 'Super fantastic label',
  persistEvents: false,
  readOnly: false,
  required: false,
  size: 'large' as PasswordProps['size'],
  transitional: false,
  transparent: false,
  unthemed: false,
  value: 'Hello world',
  variant: 'underline' as PasswordProps['variant'],
  visuallyFocused: false,
  width: '100%',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Password.test.js'],
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
