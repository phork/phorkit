import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Dropdown, DropdownProps } from '../Dropdown';
import { options, handleFilter } from './helpers/options';
import DropdownDocumentation from './Dropdown.docs.mdx';

export default {
  title: 'Form/Dropdown',
  component: Dropdown,
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
  decorators: [
    Story => (
      <div style={{ height: 240, maxWidth: 400, marginLeft: 30, marginRight: 30, minWidth: 200, width: 300 }}>
        {Story()}
      </div>
    ),
  ],
  parameters: {
    controls: {
      exclude: ['usingNotification'],
      sort: 'requiredFirst',
    },
    docs: {
      page: DropdownDocumentation,
    },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = args => <Dropdown {...args} />;

const defaultArgs = {
  allowReselect: false,
  contrast: false,
  disabled: false,
  inputVariant: 'underline' as DropdownProps['inputVariant'],
  label: 'Super fantastic label',
  layout: 'raised' as DropdownProps['layout'],
  listColor: 'primary' as DropdownProps['listColor'],
  listSize: 'medium' as DropdownProps['listSize'],
  listVariant: 'unboxed' as DropdownProps['listVariant'],
  maxSelect: 1,
  minSelect: 0,
  options,
  readOnly: false,
  searchable: false,
  size: 'large' as DropdownProps['size'],
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
  jest: ['Dropdown.test.js'],
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

export const NoOptions = Template.bind({});
NoOptions.storyName = 'No options';
NoOptions.args = {
  ...defaultArgs,
  getFilteredOptions: handleFilter,
  options: undefined,
};

export const MediumSize = Template.bind({});
MediumSize.storyName = 'Size: Medium';
MediumSize.args = {
  ...defaultArgs,
  listSize: 'medium',
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
  listSize: 'large',
  size: 'xlarge',
};

export const XXLargeSize = Template.bind({});
XXLargeSize.storyName = 'Size: 2XLarge';
XXLargeSize.args = {
  ...defaultArgs,
  listSize: 'large',
  size: '2xlarge',
};

export const XXXLargeSize = Template.bind({});
XXXLargeSize.storyName = 'Size: 3XLarge';
XXXLargeSize.args = {
  ...defaultArgs,
  listSize: 'large',
  size: '3xlarge',
};

export const XXXXLargeSize = Template.bind({});
XXXXLargeSize.storyName = 'Size: 4XLarge';
XXXXLargeSize.args = {
  ...defaultArgs,
  listSize: 'xlarge',
  size: '4xlarge',
};

export const XXXXXLargeSize = Template.bind({});
XXXXXLargeSize.storyName = 'Size: 5XLarge';
XXXXXLargeSize.args = {
  ...defaultArgs,
  listSize: 'xlarge',
  size: '5xlarge',
};

export const XXXXXXLargeSize = Template.bind({});
XXXXXXLargeSize.storyName = 'Size: 6XLarge';
XXXXXXLargeSize.args = {
  ...defaultArgs,
  listSize: 'xlarge',
  size: '6xlarge',
};

export const XXXXXXXLargeSize = Template.bind({});
XXXXXXXLargeSize.storyName = 'Size: 7XLarge';
XXXXXXXLargeSize.args = {
  ...defaultArgs,
  listSize: 'xlarge',
  size: '7xlarge',
  style: { width: 340 },
};

export const XXXXXXXXLargeSize = Template.bind({});
XXXXXXXXLargeSize.storyName = 'Size: 8XLarge';
XXXXXXXXLargeSize.args = {
  ...defaultArgs,
  listSize: 'xlarge',
  size: '8xlarge',
  style: { width: 380 },
};
