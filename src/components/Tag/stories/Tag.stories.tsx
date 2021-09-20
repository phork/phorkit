import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Tag, TagProps } from '../Tag';
import TagDocumentation from './Tag.docs.mdx';

export default {
  title: 'Display/Tag',
  component: Tag,
  argTypes: {
    children: {
      control: { type: 'text' },
    },

    actionable: {
      table: {
        category: 'Appearance controls',
      },
    },
    flush: {
      table: {
        category: 'Appearance controls',
      },
    },
    shape: {
      table: {
        category: 'Appearance controls',
      },
    },
    size: {
      options: ['2xsmall', 'xsmall', 'small', 'medium', 'large'],
      table: {
        category: 'Appearance controls',
      },
    },
    weight: {
      table: {
        category: 'Appearance controls',
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
      exclude: ['ref'],
      sort: 'requiredFirst',
    },
    docs: {
      page: TagDocumentation,
      description: {
        component: 'A tag represents a small segment of data and can be either static or actionable.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = args => <Tag {...args} />;

const defaultArgs = {
  actionable: false,
  children: 'Hello world',
  contrast: false,
  flush: false,
  shape: 'pill' as TagProps['shape'],
  size: 'small' as TagProps['size'],
  unthemed: false,
  weight: 'shaded' as TagProps['weight'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const PillShape = Template.bind({});
PillShape.storyName = 'Shape: Pill';
PillShape.args = {
  ...defaultArgs,
  shape: 'pill',
};

export const BrickShape = Template.bind({});
BrickShape.storyName = 'Shape: Brick';
BrickShape.args = {
  ...defaultArgs,
  shape: 'brick',
};

export const SolidWeight = Template.bind({});
SolidWeight.storyName = 'Weight: Solid';
SolidWeight.args = {
  ...defaultArgs,
  weight: 'solid',
};

export const ShadedWeight = Template.bind({});
ShadedWeight.storyName = 'Weight: Shaded';
ShadedWeight.args = {
  ...defaultArgs,
  weight: 'shaded',
};

export const OutlinedWeight = Template.bind({});
OutlinedWeight.storyName = 'Weight: Outlined';
OutlinedWeight.args = {
  ...defaultArgs,
  weight: 'outlined',
};

export const XXSmallSize = Template.bind({});
XXSmallSize.storyName = 'Size: 2XSmall';
XXSmallSize.args = {
  ...defaultArgs,
  size: '2xsmall',
};

export const XSmallSize = Template.bind({});
XSmallSize.storyName = 'Size: XSmall';
XSmallSize.args = {
  ...defaultArgs,
  size: 'xsmall',
};

export const SmallSize = Template.bind({});
SmallSize.storyName = 'Size: Small';
SmallSize.args = {
  ...defaultArgs,
  size: 'small',
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
