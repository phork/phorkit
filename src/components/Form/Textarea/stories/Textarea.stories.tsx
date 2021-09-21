import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { FormComponentDemo } from '../../stories/helpers/FormComponentDemo';
import { Textarea, TextareaProps } from '../Textarea';
import TextareaDocumentation from './Textarea.docs.mdx';

export default {
  title: 'Form/Textarea',
  component: Textarea,
  argTypes: {
    cols: {
      table: {
        category: 'Appearance controls',
      },
    },
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
    rows: {
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

    iconAfter: {
      table: {
        category: 'Icon controls',
      },
    },
    iconAfterActionable: {
      table: {
        category: 'Icon controls',
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
    empty: {
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
    visuallyFocused: {
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
  },
  decorators: [
    (Story, { args }) => (
      <FormComponentDemo initialValue={args.value} property="value" type="textarea">
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
      page: TextareaDocumentation,
      description: {
        component: 'A form input for entering multiple lines of text.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = args => <Textarea {...args} />;

const defaultArgs = {
  alwaysTriggerBlur: false,
  alwaysTriggerFocus: false,
  contrast: false,
  disabled: false,
  empty: false,
  inputWidth: 'auto',
  label: 'Super fantastic label',
  persistEvents: false,
  readOnly: false,
  required: false,
  rows: 3,
  size: 'large' as TextareaProps['size'],
  transitional: false,
  transparent: false,
  unthemed: false,
  value: 'Hello world',
  variant: 'underline' as TextareaProps['variant'],
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
