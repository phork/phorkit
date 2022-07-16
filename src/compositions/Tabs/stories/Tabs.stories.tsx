import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Tabs, TabsProps } from '../Tabs';
import { items } from './helpers/items';
import TabsDocumentation from './Tabs.docs.mdx';

export default {
  title: 'Surfaces/Tabs',
  component: Tabs,
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },

    fullWidth: {
      table: {
        category: 'Appearance',
      },
    },
    orientation: {
      options: ['horizontal', 'vertical'],
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    variant: {
      table: {
        category: 'Appearance',
      },
    },

    disabled: {
      table: {
        category: 'Input',
      },
    },
    items: {
      table: {
        category: 'Input',
      },
    },
    initialSelected: {
      table: {
        category: 'Input',
      },
    },
    minSelect: {
      table: {
        category: 'Input',
      },
    },

    onItemClick: {
      table: {
        category: 'Actions',
      },
    },
    onItemFocus: {
      table: {
        category: 'Actions',
      },
    },
    onKeyDown: {
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
    onUnselect: {
      table: {
        category: 'Actions',
      },
    },

    allowReselect: {
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
    listProps: {
      table: {
        category: 'Uncommon',
      },
    },
    panelGroupProps: {
      table: {
        category: 'Uncommon',
      },
    },
    parentRef: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    selectOnFocus: {
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
    triggerLinks: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    unstyled: {
      table: {
        category: 'Uncommon',
      },
    },
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: TabsDocumentation,
    },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = args => <Tabs {...args} />;

const defaultArgs = {
  allowReselect: false,
  contrast: false,
  disabled: false,
  fullWidth: false,
  initialSelected: [items[1].id],
  items,
  minSelect: 1 as TabsProps['minSelect'],
  orientation: 'horizontal' as TabsProps['orientation'],
  selectOnFocus: false,
  unstyled: false,
  variant: 'primary' as TabsProps['variant'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Tabs.test.js'],
};
*/

export const HorizontalOrientation = Template.bind({});
HorizontalOrientation.storyName = 'Orientation: Horizontal';
HorizontalOrientation.args = {
  ...defaultArgs,
  orientation: 'horizontal',
};

export const VerticalOrientation = Template.bind({});
VerticalOrientation.storyName = 'Orientation: Vertical';
VerticalOrientation.args = {
  ...defaultArgs,
  items: [
    { id: 'first', label: '1', content: 'First panel' },
    { id: 'second', label: '2', content: 'Second panel' },
    { id: 'third', label: '3', content: 'Third panel', disabled: true },
    { id: 'fourth', label: '4', content: 'Fourth panel '.repeat(150).trim() },
  ],
  orientation: 'vertical',
};

export const PrimaryVariant = Template.bind({});
PrimaryVariant.storyName = 'Variant: Primary';
PrimaryVariant.args = {
  ...defaultArgs,
  variant: 'primary',
};

export const TransparentVariant = Template.bind({});
TransparentVariant.storyName = 'Variant: Transparent';
TransparentVariant.args = {
  ...defaultArgs,
  variant: 'transparent',
};

export const FullWidth = Template.bind({});
FullWidth.storyName = 'Full width';
FullWidth.args = {
  ...defaultArgs,
  fullWidth: true,
};

export const Overflow = Template.bind({});
Overflow.args = {
  ...defaultArgs,
  items: [
    { id: 'first', label: 'First', content: 'First panel' },
    { id: 'second', label: 'Second', content: 'Second panel' },
    { id: 'third', label: 'Third', content: 'Third panel' },
    { id: 'fourth', label: 'Fourth', content: 'Fourth panel' },
    { id: 'fifth', label: 'Fifth', content: 'Fifth panel' },
    { id: 'sixth', label: 'Sixth', content: 'Sixth panel' },
    { id: 'seventh', label: 'Seventh', content: 'Seventh panel' },
    { id: 'eighth', label: 'Eighth', content: 'Eighth panel' },
    { id: 'ninth', label: 'Ninth', content: 'Ninth panel' },
    { id: 'tenth', label: 'Tenth', content: 'Tenth panel' },
    { id: 'eleventh', label: 'Eleventh', content: 'Eleventh panel' },
    { id: 'twelfth', label: 'Twelfth', content: 'Twelfth panel' },
    { id: 'thirteenth', label: 'Thirteenth', content: 'Thirteenth panel' },
    { id: 'fourteenth', label: 'Fourteenth', content: 'Fourteenth panel' },
    { id: 'fifteenth', label: 'Fifteenth', content: 'Fifteenth panel' },
  ],
};

export const AllowUnselect = Template.bind({});
AllowUnselect.storyName = 'Allow unselect';
AllowUnselect.args = {
  ...defaultArgs,
  minSelect: 0,
};

export const ItemFunctions = Template.bind({});
ItemFunctions.storyName = 'Item functions';
ItemFunctions.args = {
  ...defaultArgs,
  items: [
    {
      id: 'first',
      label: ({ focused }) => `First${focused ? ' is focused' : ''}`,
      content: ({ selected }) => `First panel${selected ? ' is selected' : ''}`,
    },
    {
      id: 'second',
      label: ({ focused }) => `Second${focused ? ' is focused' : ''}`,
      content: ({ selected }) => `Second panel${selected ? ' is selected' : ''}`,
    },
    {
      id: 'third',
      label: ({ focused }) => `Third${focused ? ' is focused' : ''}`,
      content: ({ selected }) => `Third panel${selected ? ' is selected' : ''}`,
      disabled: true,
    },
    {
      id: 'fourth',
      label: ({ focused }) => `Fourth${focused ? ' is focused' : ''}`,
      content: ({ selected }) => `Fourth panel${selected ? ' is selected' : ''}`,
    },
  ],
};
