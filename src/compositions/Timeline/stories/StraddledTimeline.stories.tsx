import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Rhythm } from 'components/Rhythm';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StraddledTimeline } from '../StraddledTimeline';
import { TimelineMarkerItemType } from '../Timeline';
import { TimelineMarkerItemProps } from '../TimelineMarkerItem';

export default {
  title: 'Display/Timeline/StraddledTimeline',
  component: StraddledTimeline,
  argTypes: {
    leftWidth: {
      table: {
        category: 'Appearance',
      },
    },
    rightWidth: {
      table: {
        category: 'Appearance',
      },
    },

    items: {
      table: {
        category: 'State',
      },
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
  decorators: [Story => <div style={{ width: 400 }}>{Story()}</div>],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="compositions/StraddledTimeline" title="StraddledTimeline" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StraddledTimeline>;

const Template: ComponentStory<typeof StraddledTimeline> = args => <StraddledTimeline {...args} />;

const defaultArgs = {
  items: [
    {
      id: 'one',
      children: <Rhythm p={4}>Hello world</Rhythm>,
      color: 'primary' as TimelineMarkerItemProps['color'],
      position: 'left-center' as TimelineMarkerItemProps['position'],
    },
    {
      id: 'two',
      children: <Rhythm p={4}>Hello world</Rhythm>,
      color: 'success' as TimelineMarkerItemProps['color'],
      position: 'right-center' as TimelineMarkerItemProps['position'],
    },
    {
      id: 'three',
      children: <Rhythm p={4}>Hello world</Rhythm>,
      color: 'warning' as TimelineMarkerItemProps['color'],
      position: 'left-center' as TimelineMarkerItemProps['position'],
    },
    {
      id: 'four',
      children: <Rhythm p={4}>Hello world</Rhythm>,
      color: 'danger' as TimelineMarkerItemProps['color'],
      position: 'right-center' as TimelineMarkerItemProps['position'],
    },
    {
      id: 'section',
      children: <Rhythm p={4}>Hello world</Rhythm>,
      color: 'neutral' as TimelineMarkerItemProps['color'],
      type: 'section' as TimelineMarkerItemType,
      position: 'left-center' as TimelineMarkerItemProps['position'],
    },
    {
      id: 'five',
      children: <Rhythm p={4}>Hello world</Rhythm>,
      color: 'neutral' as TimelineMarkerItemProps['color'],
      position: 'right-center' as TimelineMarkerItemProps['position'],
    },
  ],
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  leftWidth: 180,
  rightWidth: 180,
};

export const RightSideLarger = Template.bind({});
RightSideLarger.storyName = 'Right side larger';
RightSideLarger.args = {
  ...defaultArgs,
  leftWidth: 140,
  rightWidth: 260,
};

export const LeftSideLarger = Template.bind({});
LeftSideLarger.storyName = 'Left side larger';
LeftSideLarger.args = {
  ...defaultArgs,
  leftWidth: 260,
  rightWidth: 140,
};
