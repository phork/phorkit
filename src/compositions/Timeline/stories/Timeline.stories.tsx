import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Rhythm } from 'components/Rhythm';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Timeline } from '../Timeline';
import { TimelineItemProps } from '../TimelineItem';

export default {
  title: 'Display/Timeline',
  component: Timeline,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    items: {
      control: {
        disable: true,
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
  decorators: [Story => <div style={{ maxWidth: 400, minWidth: 200 }}>{Story()}</div>],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="compositions/Timeline" title="Timeline" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof Timeline>;

const Template: ComponentStory<typeof Timeline> = args => <Timeline {...args} />;

const defaultArgs = {
  items: [
    {
      id: 'one',
      children: <Rhythm p={4}>Hello world</Rhythm>,
      color: 'primary' as TimelineItemProps['color'],
    },
    {
      id: 'two',
      children: <Rhythm p={4}>Hello world</Rhythm>,
      color: 'success' as TimelineItemProps['color'],
    },
    {
      id: 'three',
      children: <Rhythm p={4}>Hello world</Rhythm>,
      color: 'warning' as TimelineItemProps['color'],
    },
    {
      id: 'four',
      children: <Rhythm p={4}>Hello world</Rhythm>,
      color: 'danger' as TimelineItemProps['color'],
    },
  ],
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const RightSide = Template.bind({});
RightSide.storyName = 'Right side';
RightSide.args = {
  ...defaultArgs,
};

export const LeftSide = Template.bind({});
LeftSide.storyName = 'Left side';
LeftSide.args = {
  ...defaultArgs,
  items: defaultArgs.items.map(item => ({ ...item, position: 'left-center' })),
};

export const BothSides = Template.bind({});
BothSides.storyName = 'Both sides';
BothSides.args = {
  ...defaultArgs,
  items: defaultArgs.items.map((item, i) => ({
    ...item,
    position: i % 2 ? 'left-center' : 'right-center',
    style: {
      width: 180,
      [i % 2 ? 'marginRight' : 'marginLeft']: 167,
    },
  })),
};
