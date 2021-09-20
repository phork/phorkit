import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Mutable } from 'types/utils';
import { Select, SelectProps } from '../Select';
import { options } from './helpers/options';
import SelectDocumentation from './Select.docs.mdx';

export default {
  title: 'Form/Select',
  component: Select,
  argTypes: {
    align: {
      table: {
        category: 'Appearance controls',
      },
    },
    inputClassName: {
      table: {
        category: 'Appearance controls',
      },
    },
    inputWidth: {
      table: {
        category: 'Appearance controls',
      },
    },
    label: {
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
      table: {
        category: 'Appearance controls',
      },
    },
    transparent: {
      table: {
        category: 'Appearance controls',
      },
    },
    transitional: {
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
      table: {
        category: 'Appearance controls',
      },
    },

    arrowIconSize: {
      table: {
        category: 'Icon controls',
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

    active: {
      table: {
        category: 'State controls',
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
    multiple: {
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
    values: {
      table: {
        category: 'State controls',
      },
    },
    visuallyFocused: {
      table: {
        category: 'State controls',
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
    children: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon controls',
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
      control: {
        disable: true,
      },
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
  decorators: [Story => <div style={{ maxWidth: 400, minWidth: 200, width: 400 }}>{Story()}</div>],
  parameters: {
    controls: {
      exclude: ['ref', 'translations'],
      sort: 'requiredFirst',
    },
    docs: {
      page: SelectDocumentation,
      description: {
        component: 'A dropdown input for selecting zero or more items.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = args => <Select {...args} />;

const defaultArgs = {
  alwaysTriggerBlur: false,
  alwaysTriggerFocus: false,
  contrast: false,
  disabled: false,
  empty: true,
  label: 'Super fantastic label',
  multiple: false,
  options: options as Mutable<typeof options>,
  persistEvents: false,
  readOnly: false,
  required: false,
  size: 'large' as SelectProps['size'],
  transparent: false,
  unthemed: false,
  variant: 'underline' as SelectProps['variant'],
  visuallyFocused: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
