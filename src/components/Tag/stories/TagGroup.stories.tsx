import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { TagGroupProps, TagGroup } from '../TagGroup';

export default {
  title: 'Display/TagGroup',
  component: TagGroup,
  argTypes: {
    onClick: {
      control: {
        disable: true,
      },
    },

    actionable: {
      table: {
        category: 'Appearance controls',
      },
    },
    shape: {
      options: ['pill', 'brick'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    weight: {
      options: ['solid', 'shaded', 'outlined', 'ghost', 'inline'],
      control: { type: 'radio' },
      table: {
        category: 'Appearance controls',
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
    unthemed: {
      table: {
        category: 'Uncommon controls',
      },
    },
  },
  parameters: {
    controls: {
      exclude: ['className', 'themeId'],
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Tag" title="TagGroup" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      description: {
        component: 'A simple text tag or a link that looks like a tag.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<(args: TagGroupProps) => ReturnType<typeof TagGroup>>;

const Template: ComponentStory<(args: TagGroupProps) => ReturnType<typeof TagGroup>> = ({ children, ...args }) => (
  <TagGroup {...args}>{children}</TagGroup>
);

const defaultArgs = {
  actionable: true,
  contrast: false,
  shape: 'pill' as TagGroupProps['shape'],
  size: 'small' as TagGroupProps['size'],
  weight: 'shaded' as TagGroupProps['weight'],
  tags: [
    { id: 'first', label: 'First' },
    { id: 'second', label: 'Second' },
    { id: 'third', label: 'Third' },
    { id: 'fourth', label: 'Fourth' },
  ],
  unthemed: false,
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
