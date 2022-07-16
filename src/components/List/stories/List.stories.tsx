import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { List, ListProps } from '../List';
import { ListItem } from '../ListItem';
import { items } from './helpers/items';
import ListDocumentation from './List.docs.mdx';

export default {
  title: 'Display/List',
  component: List,
  argTypes: {
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
        category: 'Appearance',
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

    as: {
      control: {
        disable: true,
      },
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
    hideFocusOutline: {
      table: {
        category: 'Uncommon',
      },
    },
    mimicSelectOnFocus: {
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
    controls: {
      exclude: ['children'],
      sort: 'requiredFirst',
    },
    docs: {
      page: ListDocumentation,
    },
  },
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = args => <List {...args} />;

const defaultArgs = {
  contrast: false,
  color: 'primary' as ListProps['color'],
  focused: false,
  hideFocusOutline: false,
  inactive: false,
  inline: false,
  items,
  mimicSelectOnFocus: false,
  rounded: false,
  scrollable: false,
  size: 'medium' as ListProps['size'],
  style: { width: 300 },
  transparent: false,
  unstyled: false,
  unthemed: false,
  variant: 'bordered' as ListProps['variant'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['List.test.js'],
};
*/

export const PrimaryColor = Template.bind({});
PrimaryColor.storyName = 'Color: Primary';
PrimaryColor.args = {
  ...defaultArgs,
  color: 'primary',
  variant: 'bordered',
};

export const NeutralColor = Template.bind({});
NeutralColor.storyName = 'Color: Neutral';
NeutralColor.args = {
  ...defaultArgs,
  color: 'neutral',
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
  rounded: true,
  size: 'xsmall',
  transparent: true,
  variant: 'unboxed',
};

export const SmallSize = Template.bind({});
SmallSize.storyName = 'Size: Small';
SmallSize.args = {
  ...defaultArgs,
  rounded: true,
  size: 'small',
  transparent: true,
  variant: 'unboxed',
};

export const MediumSize = Template.bind({});
MediumSize.storyName = 'Size: Medium';
MediumSize.args = {
  ...defaultArgs,
  rounded: true,
  size: 'medium',
  transparent: true,
  variant: 'unboxed',
};

export const LargeSize = Template.bind({});
LargeSize.storyName = 'Size: Large';
LargeSize.args = {
  ...defaultArgs,
  rounded: true,
  size: 'large',
  transparent: true,
  variant: 'unboxed',
};

export const XLargeSize = Template.bind({});
XLargeSize.storyName = 'Size: XLarge';
XLargeSize.args = {
  ...defaultArgs,
  rounded: true,
  size: 'xlarge',
  transparent: true,
  variant: 'unboxed',
};

export const Inline = Template.bind({});
Inline.args = {
  ...defaultArgs,
  inline: true,
  style: undefined,
  variant: 'bordered',
};

export const Scrollable = Template.bind({});
Scrollable.args = {
  ...defaultArgs,
  scrollable: true,
  style: { height: 140 },
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
Manual.storyName = 'With children';
Manual.args = {
  ...defaultArgs,
  as: 'div',
  items: undefined,
  variant: 'bordered',
};
