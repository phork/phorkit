import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { InteractiveList, InteractiveListProps } from '../InteractiveList';
import { items, navigationItems } from './helpers/items';

export default {
  title: 'Utilities/InteractiveList',
  component: InteractiveList,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Appearance',
      },
    },
    color: {
      items: ['primary', 'neutral'],
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    inline: {
      table: {
        category: 'Appearance',
      },
    },
    rounded: {
      table: {
        category: 'Appearance',
      },
    },
    scrollable: {
      table: {
        category: 'Scrollable',
      },
    },
    size: {
      items: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    transparent: {
      table: {
        category: 'Appearance',
      },
    },
    variant: {
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },

    disabled: {
      table: {
        category: 'State',
      },
    },
    focused: {
      table: {
        category: 'State',
      },
    },
    inactive: {
      table: {
        category: 'State',
      },
    },
    items: {
      table: {
        category: 'State',
      },
    },

    allowReselect: {
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
    mimicSelectOnFocus: {
      table: {
        category: 'Input',
      },
    },
    minSelect: {
      table: {
        category: 'Input',
      },
    },
    selectOnFocus: {
      table: {
        category: 'Input',
      },
    },
    triggerLinks: {
      table: {
        category: 'Input',
      },
    },

    onBlur: {
      table: {
        category: 'Actions',
      },
    },
    onFocus: {
      table: {
        category: 'Actions',
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
    hideFocusOutline: {
      table: {
        category: 'Uncommon',
      },
    },
    listComponent: {
      control: {
        disable: true,
      },
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
    providerProps: {
      table: {
        category: 'Uncommon',
      },
    },
    role: {
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
    unstyled: {
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
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="compositions/InteractiveList" title="InteractiveList" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof InteractiveList>;

const Template: ComponentStory<typeof InteractiveList> = args => <InteractiveList {...args} />;

const defaultArgs = {
  allowReselect: false,
  contrast: false,
  color: 'primary' as InteractiveListProps['color'],
  disabled: false,
  focused: false,
  hideFocusOutline: false,
  inactive: false,
  initialSelected: [items[0].id],
  inline: false,
  items,
  mimicSelectOnFocus: false,
  rounded: false,
  scrollable: false,
  selectOnFocus: false,
  size: 'medium' as InteractiveListProps['size'],
  style: { width: 300 },
  transparent: false,
  triggerLinks: false,
  unstyled: false,
  unthemed: false,
  variant: 'bordered' as InteractiveListProps['variant'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['InteractiveList.test.js'],
};
*/

export const ScrollToElement = Template.bind({});
ScrollToElement.storyName = 'Scroll to element';
ScrollToElement.args = {
  ...defaultArgs,
  scrollable: true,
  style: { height: 200 },
};

export const SelectOnFocus = Template.bind({});
SelectOnFocus.storyName = 'Select on focus';
SelectOnFocus.args = {
  ...defaultArgs,
  selectOnFocus: true,
};

export const MimicSelectOnFocus = Template.bind({});
MimicSelectOnFocus.storyName = 'Mimic select on focus';
MimicSelectOnFocus.args = {
  ...defaultArgs,
  mimicSelectOnFocus: true,
};

export const MultiSelect = Template.bind({});
MultiSelect.storyName = 'Multi-select';
MultiSelect.args = {
  ...defaultArgs,
  maxSelect: -1,
};

export const AllowUnselect = Template.bind({});
AllowUnselect.storyName = 'Allow unselect';
AllowUnselect.args = {
  ...defaultArgs,
  minSelect: 0,
};

export const AllowReselect = Template.bind({});
AllowReselect.storyName = 'Allow reselect';
AllowReselect.args = {
  ...defaultArgs,
  allowReselect: true,
};

export const NavigationRole = Template.bind({});
NavigationRole.storyName = 'Navigation role';
NavigationRole.args = {
  ...defaultArgs,
  allowReselect: true,
  items: navigationItems,
  providerProps: { role: 'navigation', 'aria-label': 'Primary navigation' },
};

export const LabelFunctions = Template.bind({});
LabelFunctions.storyName = 'Label functions';
LabelFunctions.args = {
  ...defaultArgs,
  items: [
    {
      id: 'first',
      label: ({ focused, selected }) => (
        <div style={{ height: '60px' }}>
          First {focused ? 'is focused!' : ''} {selected ? 'is selected!' : ''}
        </div>
      ),
    },
    {
      id: 'second',
      label: ({ focused, selected }) => (
        <div style={{ height: '60px' }}>
          Second {focused ? 'is focused!' : ''} {selected ? 'is selected!' : ''}
        </div>
      ),
    },
    {
      id: 'third',
      label: ({ focused, selected }) => (
        <div style={{ height: '60px' }}>
          Third {focused ? 'is focused!' : ''} {selected ? 'is selected!' : ''}
        </div>
      ),
    },
    {
      id: 'fourth',
      label: ({ focused, selected }) => (
        <div style={{ height: '60px' }}>
          Fourth {focused ? 'is focused!' : ''} {selected ? 'is selected!' : ''}
        </div>
      ),
    },
  ],
  triggerLinks: true,
};

export const Empty = Template.bind({});
Empty.args = {
  ...defaultArgs,
  children: <Typography color="primary">This list is empty</Typography>,
  items: [],
};
