import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { TagGroupProps, TagGroup } from '../TagGroup';

export default {
  title: 'Display/TagGroup',
  component: TagGroup,
  argTypes: {
    actionable: {
      table: {
        category: 'Appearance',
      },
    },
    shape: {
      options: ['pill', 'brick'],
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    weight: {
      options: ['solid', 'shaded', 'outlined', 'ghost', 'inline'],
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },

    tags: {
      table: {
        category: 'State',
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
  parameters: {
    controls: {
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
    },
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
  tags: [
    { id: 'first', label: 'First' },
    { id: 'second', label: 'Second' },
    { id: 'third', label: 'Third' },
    { id: 'fourth', label: 'Fourth' },
  ],
  unthemed: false,
  weight: 'shaded' as TagGroupProps['weight'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['TagGroup.test.js'],
};
*/

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
