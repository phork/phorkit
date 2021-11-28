import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { ThemeColors, themes } from 'config/themes';
import { Paper } from 'components/Paper';
import { Rhythm } from 'components/Rhythm';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Timeline, TimelineAnchorItemType, TimelineSpacing } from '../Timeline';
import { TimelineMarkerItem, TimelineMarkerItemProps } from '../TimelineMarkerItem';

export default {
  title: 'Display/Timeline',
  component: Timeline,
  argTypes: {
    spacing: {
      options: [undefined, 'cozy', 'comfy'],
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

    children: {
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
      color: 'primary' as TimelineMarkerItemProps['color'],
    },
    {
      id: 'two',
      children: <Rhythm p={4}>Hello world</Rhythm>,
      color: 'success' as TimelineMarkerItemProps['color'],
    },
    {
      id: 'three',
      children: <Rhythm p={4}>Hello world</Rhythm>,
      color: 'warning' as TimelineMarkerItemProps['color'],
    },
    {
      id: 'four',
      children: <Rhythm p={4}>Hello world</Rhythm>,
      color: 'danger' as TimelineMarkerItemProps['color'],
    },
    {
      id: 'divider',
      children: <Rhythm p={4}>Hello world</Rhythm>,
      color: 'neutral' as TimelineMarkerItemProps['color'],
      type: 'divider' as TimelineAnchorItemType,
    },
    {
      id: 'five',
      children: <Rhythm p={4}>Hello world</Rhythm>,
      color: 'neutral' as TimelineMarkerItemProps['color'],
    },
  ],
  spacing: 'cozy' as TimelineSpacing,
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const CozySpacing = Template.bind({});
CozySpacing.storyName = 'Spacing: Cozy';
CozySpacing.args = {
  ...defaultArgs,
  spacing: 'cozy' as TimelineSpacing,
};

export const ComfySpacing = Template.bind({});
ComfySpacing.storyName = 'Spacing: Comfy';
ComfySpacing.args = {
  ...defaultArgs,
  spacing: 'comfy' as TimelineSpacing,
};

export const NoSpacing = Template.bind({});
NoSpacing.storyName = 'Spacing: Undefined';
NoSpacing.args = {
  ...defaultArgs,
  spacing: undefined,
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

export const LeftTopPosition = Template.bind({});
LeftTopPosition.storyName = 'Position: Left top';
LeftTopPosition.args = {
  ...defaultArgs,
  items: defaultArgs.items.map(item => ({
    ...item,
    children: (
      <Rhythm p={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue congue nunc eget commodo. Nunc lacus mi,
        sagittis in placerat.
      </Rhythm>
    ),
    position: 'left-top',
  })),
};

export const LeftBottomPosition = Template.bind({});
LeftBottomPosition.storyName = 'Position: Left bottom';
LeftBottomPosition.args = {
  ...defaultArgs,
  items: defaultArgs.items.map(item => ({
    ...item,
    children: (
      <Rhythm p={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue congue nunc eget commodo. Nunc lacus mi,
        sagittis in placerat.
      </Rhythm>
    ),
    position: 'left-bottom',
  })),
};

export const RightTopPosition = Template.bind({});
RightTopPosition.storyName = 'Position: Right top';
RightTopPosition.args = {
  ...defaultArgs,
  items: defaultArgs.items.map(item => ({
    ...item,
    children: (
      <Rhythm p={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue congue nunc eget commodo. Nunc lacus mi,
        sagittis in placerat.
      </Rhythm>
    ),
    position: 'right-top',
  })),
};

export const RightBottomPosition = Template.bind({});
RightBottomPosition.storyName = 'Position: Right bottom';
RightBottomPosition.args = {
  ...defaultArgs,
  items: defaultArgs.items.map(item => ({
    ...item,
    children: (
      <Rhythm p={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue congue nunc eget commodo. Nunc lacus mi,
        sagittis in placerat.
      </Rhythm>
    ),
    position: 'right-bottom',
  })),
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
      [i % 2 ? 'marginRight' : 'marginLeft']: 169,
    },
  })),
};

BothSides.parameters = {
  docs: {
    description: {
      story:
        'The StraddledTimeline component provides this functionality, but this story gives an example of an alternative way to do it.',
    },
  },
};

export const Styled = Template.bind({});
Styled.storyName = 'Custom styles';
Styled.args = {
  ...defaultArgs,
  items: defaultArgs.items.map(({ color, ...item }, index) => ({
    ...item,
    position: 'right-center',
    style: {
      '--timeline-item-connector-color': themes.light['primary-palette-border-color'],
      '--timeline-item-state-color': themes.light[`color-P${index * 5 + 30}` as keyof ThemeColors],
      '--shade-primary-color': themes.light[`color-P${index * 5 + 30}` as keyof ThemeColors],
      '--shade-opaque-primary-color': themes.light[`color-P${index * 5 + 30}-shade` as keyof ThemeColors],
      '--status-bubble-state-color': themes.light[`color-P${index * 5 + 30}` as keyof ThemeColors],
      '--status-bubble-state-contrast-color': themes.light[`color-P${index * 5 + 30}-contrast` as keyof ThemeColors],
      '--status-bubble-triangle-color': themes.light[`color-P${index * 5 + 30}-shade` as keyof ThemeColors],
      '--status-bubble-triangle-border-color': themes.light[`color-P${index * 5 + 30}` as keyof ThemeColors],
    },
    unthemed: true,
  })),
};

export const Toasty = Template.bind({});
Toasty.args = {
  ...defaultArgs,
  items: defaultArgs.items.map(({ color, ...item }, index) => ({
    ...item,
    children: (
      <Paper
        color="tertiary"
        style={{ borderLeft: `5px solid ${themes.light[`color-P${index * 5 + 30}` as keyof ThemeColors]}` }}
        themeId="dark"
      >
        <Rhythm p={4}>Hello world</Rhythm>
      </Paper>
    ),
    header: undefined,
    position: 'right-center',
    squared: true,
    style: {
      '--timeline-item-connector-color': themes.light['primary-palette-border-color'],
      '--timeline-item-state-color': themes.light[`color-P${index * 5 + 30}` as keyof ThemeColors],
      '--status-bubble-triangle-color': themes.light[`color-P${index * 5 + 30}` as keyof ThemeColors],
    } as React.CSSProperties,
    triangleSize: 6,
    unbordered: true,
    unthemed: true,
  })),
};

export const Children = Template.bind({});
Children.storyName = 'Using item children';
Children.args = {
  ...defaultArgs,
  children: (
    <React.Fragment>
      <TimelineMarkerItem first color="primary">
        <Rhythm p={4}>Hello world</Rhythm>
      </TimelineMarkerItem>
      <TimelineMarkerItem color="success">
        <Rhythm p={4}>Hello world</Rhythm>
      </TimelineMarkerItem>
      <TimelineMarkerItem color="warning">
        <Rhythm p={4}>Hello world</Rhythm>
      </TimelineMarkerItem>
      <TimelineMarkerItem last color="danger">
        <Rhythm p={4}>Hello world</Rhythm>
      </TimelineMarkerItem>
    </React.Fragment>
  ),
  items: undefined,
  spacing: 'cozy',
};
