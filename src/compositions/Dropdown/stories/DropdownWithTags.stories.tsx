import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { DropdownWithTags, DropdownWithTagsProps } from '../DropdownWithTags';
import { options, handleFilter } from './helpers/options';
import DropdownWithTagsDocumentation from './DropdownWithTags.docs.mdx';

export default {
  title: 'Form/DropdownWithTags',
  component: DropdownWithTags,
  argTypes: {
    emptyNotification: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Appearance',
      },
    },
    iconBefore: {
      control: {
        disable: true,
      },
      table: {
        category: 'Appearance',
      },
    },
    inputVariant: {
      table: {
        category: 'Appearance',
      },
    },
    label: {
      table: {
        category: 'Appearance',
      },
    },
    layout: {
      table: {
        category: 'Appearance',
      },
    },
    listColor: {
      table: {
        category: 'Appearance',
      },
    },
    listSize: {
      table: {
        category: 'Appearance',
      },
    },
    listVariant: {
      table: {
        category: 'Appearance',
      },
    },
    placeholder: {
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
    transitional: {
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

    tag: {
      table: {
        category: 'Tags',
      },
    },
    tagGroupProps: {
      table: {
        category: 'Tags',
      },
    },
    tagProps: {
      table: {
        category: 'Tags',
      },
    },
    tagShape: {
      table: {
        category: 'Tags',
      },
    },
    tagSize: {
      table: {
        category: 'Tags',
      },
    },
    tagWeight: {
      table: {
        category: 'Tags',
      },
    },

    allowReselect: {
      table: {
        category: 'Input',
      },
    },
    disabled: {
      table: {
        category: 'Input',
      },
    },
    disabledIds: {
      table: {
        category: 'Input',
      },
    },
    formattedValue: {
      table: {
        category: 'Input',
      },
    },
    getFilteredOptions: {
      table: {
        category: 'Input',
      },
    },
    initialSelected: {
      control: {
        disable: true,
      },
      table: {
        category: 'Input',
      },
    },
    maxSelect: {
      table: {
        category: 'Input',
      },
    },
    minSelect: {
      table: {
        category: 'Input',
      },
    },
    options: {
      control: {
        disable: true,
      },
      table: {
        category: 'Input',
      },
    },
    readOnly: {
      table: {
        category: 'Input',
      },
    },
    searchable: {
      table: {
        category: 'Input',
      },
    },

    onClear: {
      table: {
        category: 'Actions',
      },
    },
    onClose: {
      table: {
        category: 'Actions',
      },
    },
    onInputChange: {
      table: {
        category: 'Actions',
      },
    },
    onItemFocus: {
      table: {
        category: 'Actions',
      },
    },
    onOpen: {
      table: {
        category: 'Actions',
      },
    },
    onSelect: {
      table: {
        category: 'Actions',
      },
    },
    onSelectionChange: {
      table: {
        category: 'Actions',
      },
    },
    onSubmit: {
      table: {
        category: 'Actions',
      },
    },
    onUnselect: {
      table: {
        category: 'Actions',
      },
    },

    alwaysVisibleDropdown: {
      control: {
        type: 'radio',
        options: [true, undefined],
      },
      table: {
        category: 'Uncommon',
      },
    },
    arrowIconSize: {
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
  decorators: [Story => <div style={{ height: 240, marginLeft: 30, marginRight: 30, minWidth: 200 }}>{Story()}</div>],
  parameters: {
    controls: {
      exclude: ['usingNotification'],
      sort: 'requiredFirst',
    },
    docs: {
      page: DropdownWithTagsDocumentation,
    },
  },
} as ComponentMeta<typeof DropdownWithTags>;

const Template: ComponentStory<typeof DropdownWithTags> = args => <DropdownWithTags {...args} />;

const defaultArgs = {
  allowReselect: false,
  contrast: false,
  disabled: false,
  initialSelected: [options[3], options[5], options[7]],
  inputVariant: 'underline' as DropdownWithTagsProps['inputVariant'],
  label: 'Super fantastic label',
  layout: 'raised' as DropdownWithTagsProps['layout'],
  listColor: 'primary' as DropdownWithTagsProps['listColor'],
  listSize: 'medium' as DropdownWithTagsProps['listSize'],
  listVariant: 'unboxed' as DropdownWithTagsProps['listVariant'],
  maxSelect: -1,
  minSelect: 0,
  options,
  readOnly: false,
  searchable: false,
  size: 'large' as DropdownWithTagsProps['size'],
  style: { width: 300 },
  tagShape: 'pill' as DropdownWithTagsProps['tagShape'],
  tagSize: 'xsmall' as DropdownWithTagsProps['tagSize'],
  tagWeight: 'outlined' as DropdownWithTagsProps['tagWeight'],
  transitional: true,
  unthemed: false,
  usingNotification: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['DropdownWithTags.test.js'],
};
*/

export const RaisedLayout = Template.bind({});
RaisedLayout.storyName = 'Layout: Raised';
RaisedLayout.args = {
  ...defaultArgs,
  layout: 'raised',
};

export const ContainedLayout = Template.bind({});
ContainedLayout.storyName = 'Layout: Contained';
ContainedLayout.args = {
  ...defaultArgs,
  layout: 'contained',
};

export const InputVariantUnderline = Template.bind({});
InputVariantUnderline.storyName = 'Input variant: Underline';
InputVariantUnderline.args = {
  ...defaultArgs,
  inputVariant: 'underline',
};

export const InputVariantFilled = Template.bind({});
InputVariantFilled.storyName = 'Input variant: Filled';
InputVariantFilled.args = {
  ...defaultArgs,
  inputVariant: 'filled',
};

export const InputVariantOutline = Template.bind({});
InputVariantOutline.storyName = 'Input variant: Outline';
InputVariantOutline.args = {
  ...defaultArgs,
  inputVariant: 'outline',
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  ...defaultArgs,
  initialSelected: undefined,
  placeholder: 'Choose some colors',
};

export const Filterable = Template.bind({});
Filterable.args = {
  ...defaultArgs,
  getFilteredOptions: handleFilter,
};
