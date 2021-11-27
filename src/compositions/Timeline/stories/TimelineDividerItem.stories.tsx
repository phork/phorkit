import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { themes } from 'config/themes';
import { Paper } from 'components/Paper';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { TimelineDividerItem, TimelineDividerItemProps } from '../TimelineDividerItem';

export default {
  title: 'Display/Timeline/Items/TimelineDividerItem',
  component: TimelineDividerItem,
  argTypes: {
    children: {
      control: {
        disable: true,
      },
      table: {
        category: 'Appearance',
      },
    },
    color: {
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    first: {
      table: {
        category: 'Appearance',
      },
    },
    header: {
      control: {
        disable: true,
      },
      table: {
        category: 'Appearance',
      },
    },
    last: {
      table: {
        category: 'Appearance',
      },
    },
    position: {
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    width: {
      table: {
        category: 'Appearance',
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
    triangleBorderColor: {
      table: {
        category: 'Uncommon',
      },
    },
    triangleColor: {
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
          <PageTitle src="compositions/Timeline" title="TimelineDividerItem" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof TimelineDividerItem>;

const Template: ComponentStory<typeof TimelineDividerItem> = args => <TimelineDividerItem {...args} />;

const defaultArgs = {
  children: (
    <Paper color="primary">
      <Rhythm p={4}>Hello world</Rhythm>
    </Paper>
  ),
  color: 'neutral' as TimelineDividerItemProps['color'],
  first: false,
  last: false,
  header: (
    <React.Fragment>
      <Rhythm mr={2}>
        <Typography weight="bold">Something cool happened</Typography>
      </Rhythm>
      <Rhythm ml={2}>
        <Typography volume="quiet">Yesterday</Typography>
      </Rhythm>
    </React.Fragment>
  ),
  position: 'right-top' as TimelineDividerItemProps['position'],
  style: {
    '--timeline-item-connector-color': themes.light['primary-palette-border-color'],
  } as React.CSSProperties,
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const PrimaryColor = Template.bind({});
PrimaryColor.storyName = 'Color: Primary';
PrimaryColor.args = {
  ...defaultArgs,
  color: 'primary',
};

export const SuccessColor = Template.bind({});
SuccessColor.storyName = 'Color: Success';
SuccessColor.args = {
  ...defaultArgs,
  color: 'success',
};

export const WarningColor = Template.bind({});
WarningColor.storyName = 'Color: Warning';
WarningColor.args = {
  ...defaultArgs,
  color: 'warning',
};

export const DangerColor = Template.bind({});
DangerColor.storyName = 'Color: Danger';
DangerColor.args = {
  ...defaultArgs,
  color: 'danger',
};

export const NeutralColor = Template.bind({});
NeutralColor.storyName = 'Color: Neutral';
NeutralColor.args = {
  ...defaultArgs,
  color: 'neutral',
};

export const LeftTopPosition = Template.bind({});
LeftTopPosition.storyName = 'Position: Left top';
LeftTopPosition.args = {
  ...defaultArgs,
  position: 'left-top',
};

export const LeftCenterPosition = Template.bind({});
LeftCenterPosition.storyName = 'Position: Left center';
LeftCenterPosition.args = {
  ...defaultArgs,
  position: 'left-center',
};

export const LeftBottomPosition = Template.bind({});
LeftBottomPosition.storyName = 'Position: Left bottom';
LeftBottomPosition.args = {
  ...defaultArgs,
  position: 'left-bottom',
};

export const RightTopPosition = Template.bind({});
RightTopPosition.storyName = 'Position: Right top';
RightTopPosition.args = {
  ...defaultArgs,
  position: 'right-top',
};

export const RightCenterPosition = Template.bind({});
RightCenterPosition.storyName = 'Position: Right center';
RightCenterPosition.args = {
  ...defaultArgs,
  position: 'right-center',
};

export const RightBottomPosition = Template.bind({});
RightBottomPosition.storyName = 'Position: Right bottom';
RightBottomPosition.args = {
  ...defaultArgs,
  position: 'right-bottom',
};

export const Styled = Template.bind({});
Styled.storyName = 'Custom styles';
Styled.args = {
  ...defaultArgs,
  style: {
    '--timeline-item-connector-color': themes.light['primary-palette-border-color'],
    '--shade-primary-color': themes.light['color-P50'],
    '--shade-opaque-primary-color': themes.light['color-P50-shade'],
    '--status-bubble-state-color': themes.light['color-P50'],
    '--status-bubble-state-contrast-color': themes.light['color-P50-contrast'],
    '--status-bubble-triangle-color': themes.light['color-P50-shade'],
    '--status-bubble-triangle-border-color': themes.light['color-P50-D10'],
  } as React.CSSProperties,
  unthemed: true,
};

export const Toasty = Template.bind({});
Toasty.storyName = 'Toasty';
Toasty.args = {
  ...defaultArgs,
  children: (
    <Paper color="tertiary" style={{ borderLeft: `5px solid ${themes.light['color-warning']}` }} themeId="dark">
      <Rhythm p={4}>Hello world</Rhythm>
    </Paper>
  ),
  header: undefined,
  position: 'right-center',
  squared: true,
  style: {
    '--timeline-item-connector-color': themes.light['primary-palette-border-color'],
    '--timeline-item-state-color': themes.light['color-warning'],
    '--status-bubble-triangle-color': themes.light['color-warning'],
    maxWidth: 300,
  } as React.CSSProperties,
  triangleSize: 6,
  unbordered: true,
  unthemed: true,
};
