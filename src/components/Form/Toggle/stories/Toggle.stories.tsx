import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { FormComponentDemo } from '../../stories/helpers/FormComponentDemo';
import { Toggle } from '../Toggle';
import ToggleDocumentation from './Toggle.docs.mdx';

export default {
  title: 'Form/Toggle',
  component: Toggle,
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
      option: { type: 'radio' },
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
  },

  decorators: [
    (Story, { args }) => (
      <FormComponentDemo initialValue={args.checked} property="checked" type="toggle">
        {Story()}
      </FormComponentDemo>
    ),
  ],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: ToggleDocumentation,
    },
  },
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = args => <Toggle {...args} />;

const defaultArgs = {
  checked: true,
  children: 'Super fantastic label',
  contrast: false,
  disabled: false,
  full: false,
  persistEvents: false,
  reverse: false,
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  children: undefined,
};

/*
Default.parameters = {
  jest: ['Toggle.test.js'],
};
*/

export const Labeled = Template.bind({});
Labeled.args = {
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

export const DisabledCheckedState = Template.bind({});
DisabledCheckedState.storyName = 'State: Checked, disabled';
DisabledCheckedState.args = {
  ...defaultArgs,
  checked: true,
  disabled: true,
};

export const DisabledUncheckedState = Template.bind({});
DisabledUncheckedState.storyName = 'State: Unchecked, disabled';
DisabledUncheckedState.args = {
  ...defaultArgs,
  checked: false,
  disabled: true,
};

export const SmallSize = Template.bind({});
SmallSize.storyName = 'Size: Small';
SmallSize.args = {
  ...defaultArgs,
  size: 'small',
};
