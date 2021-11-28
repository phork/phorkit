import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { ThemeColors, themes } from 'config/themes';
import { Paper } from 'components/Paper';
import { Rhythm } from 'components/Rhythm';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StraddledTimeline } from '../StraddledTimeline';
import { TimelineAnchorItemType, TimelineSpacing } from '../Timeline';
import { TimelineMarkerItem, TimelineMarkerItemProps } from '../TimelineMarkerItem';

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
      id: 'divider',
      children: <Rhythm p={4}>Hello world</Rhythm>,
      color: 'neutral' as TimelineMarkerItemProps['color'],
      type: 'divider' as TimelineAnchorItemType,
      position: 'left-center' as TimelineMarkerItemProps['position'],
    },
    {
      id: 'five',
      children: <Rhythm p={4}>Hello world</Rhythm>,
      color: 'neutral' as TimelineMarkerItemProps['color'],
      position: 'right-center' as TimelineMarkerItemProps['position'],
    },
  ],
  leftWidth: 180,
  rightWidth: 180,
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

export const TopPositions = Template.bind({});
TopPositions.storyName = 'Top positions';
TopPositions.args = {
  ...defaultArgs,
  items: defaultArgs.items.map(({ position, ...item }) => ({
    ...item,
    children: (
      <Rhythm p={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue congue nunc eget commodo. Nunc lacus mi,
        sagittis in placerat.
      </Rhythm>
    ),
    position: position?.replace('center', 'top') as TimelineMarkerItemProps['position'],
  })),
};

export const BottomPositions = Template.bind({});
BottomPositions.storyName = 'Bottom positions';
BottomPositions.args = {
  ...defaultArgs,
  items: defaultArgs.items.map(({ position, ...item }) => ({
    ...item,
    children: (
      <Rhythm p={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue congue nunc eget commodo. Nunc lacus mi,
        sagittis in placerat.
      </Rhythm>
    ),
    position: position?.replace('center', 'bottom') as TimelineMarkerItemProps['position'],
  })),
};

export const Styled = Template.bind({});
Styled.storyName = 'Styled';
Styled.args = {
  ...defaultArgs,
  items: defaultArgs.items.map(({ color, ...item }, index) => ({
    ...item,
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
  items: defaultArgs.items.map(({ color, position, ...item }, index) => ({
    ...item,
    children: (
      <Paper
        color="tertiary"
        style={{
          [position?.includes('left') ? 'borderRight' : 'borderLeft']: `5px solid ${
            themes.light[`color-P${index * 5 + 30}` as keyof ThemeColors]
          }`,
        }}
        themeId="dark"
      >
        <Rhythm p={4}>Hello world</Rhythm>
      </Paper>
    ),
    header: undefined,
    position,
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
      <TimelineMarkerItem first color="primary" position="left-center" width={180}>
        <Rhythm p={4}>Hello world</Rhythm>
      </TimelineMarkerItem>
      <TimelineMarkerItem color="success" position="right-center" width={180}>
        <Rhythm p={4}>Hello world</Rhythm>
      </TimelineMarkerItem>
      <TimelineMarkerItem color="warning" position="left-center" width={180}>
        <Rhythm p={4}>Hello world</Rhythm>
      </TimelineMarkerItem>
      <TimelineMarkerItem last color="danger" position="right-center" width={180}>
        <Rhythm p={4}>Hello world</Rhythm>
      </TimelineMarkerItem>
    </React.Fragment>
  ),
  items: undefined,
  spacing: 'cozy',
};
