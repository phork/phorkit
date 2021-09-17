import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { List, ListProps } from '../List';
import { ListItem } from '../ListItem';
import ListDocumentation from './List.docs.mdx';

export default {
  title: 'Display/List',
  component: List,
  argTypes: {
    color: {
      options: ['primary', 'minimal'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    inline: {
      table: {
        category: 'Appearance controls',
      },
    },
    rounded: {
      table: {
        category: 'Appearance controls',
      },
    },
    size: {
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
      control: { type: 'radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    transparent: {
      table: {
        category: 'Appearance controls',
      },
    },
    variant: {
      control: { type: 'radio' },
      table: {
        category: 'Appearance controls',
      },
    },

    focused: {
      table: {
        category: 'State controls',
      },
    },
    inactive: {
      table: {
        category: 'State controls',
      },
    },

    as: {
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
    hideFocusOutline: {
      table: {
        category: 'Uncommon controls',
      },
    },
    mimicSelectOnFocus: {
      table: {
        category: 'Uncommon controls',
      },
    },
    role: {
      table: {
        category: 'Uncommon controls',
      },
    },
    style: {
      table: {
        category: 'Uncommon controls',
      },
    },
    unstyled: {
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
      exclude: ['children', 'className', 'ref', 'themeId'],
      sort: 'requiredFirst',
    },
    docs: {
      page: ListDocumentation,
      description: {
        component:
          'A simple read-only list. For an interactive list see the [InteractiveList](?path=/story/input-interactivelist--default) component.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = args => <List {...args} />;

const defaultArgs = {
  color: 'primary' as ListProps['color'],
  items: [
    { id: 'normal0', label: 'Normal' },
    { id: 'selected', label: 'Selected', selected: true },
    { id: 'normal1', label: 'Normal' },
    { id: 'normal2', label: 'Normal' },
    { id: 'normal3', label: 'Normal' },
    { id: 'highlighted', label: 'Highlighted', highlighted: true },
    { id: 'disabled', label: 'Disabled', disabled: true },
    { id: 'inactive', label: 'Inactive', inactive: true },
  ],
  size: 'medium' as ListProps['size'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  contrast: false,
  focused: false,
  hideFocusOutline: false,
  inactive: false,
  inline: false,
  mimicSelectOnFocus: false,
  rounded: false,
  transparent: false,
  unstyled: false,
  unthemed: false,
};

export const PrimaryColor = Template.bind({});
PrimaryColor.storyName = 'Color: Primary';
PrimaryColor.args = {
  ...defaultArgs,
  color: 'primary',
  variant: 'bordered',
};

export const MinimalColor = Template.bind({});
MinimalColor.storyName = 'Color: Minimal';
MinimalColor.args = {
  ...defaultArgs,
  color: 'minimal',
  variant: 'bordered',
};

export const BorderedVariant = Template.bind({});
BorderedVariant.storyName = 'Variant: Bordered';
BorderedVariant.args = {
  ...defaultArgs,
  variant: 'bordered',
};

export const ShadowedVariant = Template.bind({});
ShadowedVariant.storyName = 'Variant: Shadowed';
ShadowedVariant.args = {
  ...defaultArgs,
  variant: 'shadowed',
};

export const DividedVariant = Template.bind({});
DividedVariant.storyName = 'Variant: Divided';
DividedVariant.args = {
  ...defaultArgs,
  variant: 'divided',
};

export const UnboxedVariant = Template.bind({});
UnboxedVariant.storyName = 'Variant: Unboxed';
UnboxedVariant.args = {
  ...defaultArgs,
  rounded: true,
  transparent: true,
  variant: 'unboxed',
};

export const XSmallSize = Template.bind({});
XSmallSize.storyName = 'Size: XSmall';
XSmallSize.args = {
  ...defaultArgs,
  size: 'xsmall',
  variant: 'bordered',
};

export const SmallSize = Template.bind({});
SmallSize.storyName = 'Size: Small';
SmallSize.args = {
  ...defaultArgs,
  size: 'small',
  variant: 'bordered',
};

export const MediumSize = Template.bind({});
MediumSize.storyName = 'Size: Medium';
MediumSize.args = {
  ...defaultArgs,
  size: 'medium',
  variant: 'bordered',
};

export const LargeSize = Template.bind({});
LargeSize.storyName = 'Size: Large';
LargeSize.args = {
  ...defaultArgs,
  size: 'large',
  variant: 'bordered',
};

export const XLargeSize = Template.bind({});
XLargeSize.storyName = 'Size: XLarge';
XLargeSize.args = {
  ...defaultArgs,
  size: 'xlarge',
  variant: 'bordered',
};

export const Inline = Template.bind({});
Inline.args = {
  ...defaultArgs,
  inline: true,
  variant: 'bordered',
};

export const Manual = (args: ListProps<'div'>) => (
  <List<'div'> {...args}>
    <ListItem<'div'> as="div">Normal</ListItem>
    <ListItem<'div'> selected as="div">
      Selected
    </ListItem>
    <ListItem<'div'> as="div">Normal</ListItem>
    <ListItem<'div'> as="div">Normal</ListItem>
    <ListItem<'div'> as="div">Normal</ListItem>
    <ListItem<'div'> highlighted as="div">
      Highlighted
    </ListItem>
    <ListItem<'div'> disabled as="div">
      Disabled
    </ListItem>
    <ListItem<'div'> inactive as="div">
      Inactive
    </ListItem>
  </List>
);
Manual.args = {
  ...defaultArgs,
  as: 'div',
  items: undefined,
  variant: 'bordered',
};
