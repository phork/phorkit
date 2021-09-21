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
    inputWidth: {
      control: { type: 'text' },
      table: {
        category: 'Appearance controls',
      },
    },
    label: {
      control: { type: 'text' },
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
    transitional: {
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
    width: {
      control: { type: 'text' },
      table: {
        category: 'Appearance controls',
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
        category: 'Icon controls',
        subcategory: 'Visibility icons',
      },
    },
    iconHideSize: {
      table: {
        category: 'Icon controls',
        subcategory: 'Visibility icons',
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
        category: 'Icon controls',
        subcategory: 'Visibility icons',
      },
    },
    iconShowSize: {
      table: {
        category: 'Icon controls',
        subcategory: 'Visibility icons',
      },
    },

    iconAfterClassName: {
      control: {
        disable: true,
      },
      table: {
        category: 'Icon controls',
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
        category: 'Icon controls',
      },
    },
    iconBeforeActionable: {
      table: {
        category: 'Icon controls',
      },
    },
    iconBeforeClassName: {
      control: {
        disable: true,
      },
      table: {
        category: 'Icon controls',
      },
    },

    disabled: {
      table: {
        category: 'State controls',
      },
    },
    initialType: {
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
      control: { type: 'text' },
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
      <FormComponentDemo initialValue={args.value} property="value" type="password">
        {Story()}
      </FormComponentDemo>
    ),
  ],
  parameters: {
    controls: {
      exclude: ['translations'],
      sort: 'requiredFirst',
    },
    docs: {
      page: PasswordDocumentation,
      description: {
        component: 'A form input for entering a single line of text.',
      },
    },
    layout: 'centered',
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
  value: 'Hello world',
  variant: 'underline' as PasswordProps['variant'],
  visuallyFocused: false,
  width: '100%',
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
