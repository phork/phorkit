import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Radio, RadioProps } from '../Radio';
import RadioDocumentation from './Radio.docs.mdx';

export default {
  title: 'Form/Radio',
  component: Radio,
  argTypes: {
    children: {
      control: { type: 'text' },
    },

    full: {
      table: {
        category: 'Appearance controls',
      },
    },
    grouped: {
      table: {
        category: 'Appearance controls',
      },
    },
    name: {
      table: {
        category: 'Appearance controls',
      },
    },
    reverse: {
      table: {
        category: 'Appearance controls',
      },
    },
    size: {
      table: {
        category: 'Appearance controls',
      },
    },
    validity: {
      table: {
        category: 'Appearance controls',
      },
    },
    variant: {
      table: {
        category: 'Appearance controls',
      },
    },

    checked: {
      table: {
        category: 'State controls',
      },
    },
    disabled: {
      table: {
        category: 'State controls',
      },
    },
    value: {
      table: {
        category: 'State controls',
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
    inputStyle: {
      table: {
        category: 'Uncommon controls',
      },
    },
    labelProps: {
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
  parameters: {
    controls: {
      exclude: ['persistEvents', 'ref'],
      sort: 'requiredFirst',
    },
    docs: {
      page: RadioDocumentation,
      description: {
        component: 'A form component to turn an option on or off.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = args => <Radio {...args} />;

const defaultArgs = {
  checked: false,
  children: 'Super fantastic label',
  contrast: false,
  disabled: false,
  full: false,
  reverse: false,
  size: 'large' as RadioProps['size'],
  unthemed: false,
  variant: 'primary' as RadioProps['variant'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

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
