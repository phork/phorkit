import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { themes } from 'config/themes';
import { Divider } from 'components/Divider';
import { Paper } from 'components/Paper';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StatusBubble, StatusBubbleProps } from '../StatusBubble';

export default {
  title: 'Display/StatusBubble',
  component: StatusBubble,
  argTypes: {
    anchor: {
      control: {
        disable: true,
      },
      table: {
        category: 'Appearance',
      },
    },
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
    header: {
      control: {
        disable: true,
      },
      table: {
        category: 'Appearance',
      },
    },
    offset: {
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
    squared: {
      table: {
        category: 'Appearance',
      },
    },
    unbordered: {
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
    triangleSize: {
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
          <PageTitle src="compositions/StatusBubble" title="StatusBubble" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StatusBubble>;

const Template: ComponentStory<(args: StatusBubbleProps) => ReturnType<typeof StatusBubble>> = args => (
  <StatusBubble {...args} />
);

const defaultArgs = {
  anchor: (
    <Typography<'div'> as="div" style={{ marginTop: 13, marginBottom: 13 }} variants="xsmall-caps">
      anchor
    </Typography>
  ),
  children: (
    <Paper color="primary">
      <Rhythm p={4}>Hello world</Rhythm>
    </Paper>
  ),
  color: 'neutral' as StatusBubbleProps['color'],
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
  position: 'right-top' as StatusBubbleProps['position'],
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StatusBubble.test.js'],
};
*/

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

export const NoHeader = Template.bind({});
NoHeader.storyName = 'No header';
NoHeader.args = {
  ...defaultArgs,
  header: undefined,
  children: (
    <React.Fragment>
      <Paper color="primary">
        <Rhythm grouped px={4} py={3}>
          <div>Hello world</div>
          <div>Hello world</div>
          <div>Hello world</div>
        </Rhythm>
      </Paper>
      <Divider volume="quieter" />
      <Paper color="secondary">
        <Rhythm grouped px={4} py={3}>
          <div>Hello world</div>
        </Rhythm>
      </Paper>
    </React.Fragment>
  ),
  color: 'primary',
  style: { maxWidth: 400 },
};

export const NoChildren = Template.bind({});
NoChildren.storyName = 'No children';
NoChildren.args = {
  ...defaultArgs,
  children: undefined,
  style: { maxWidth: 400 },
};

export const NoTriangle = Template.bind({});
NoTriangle.storyName = 'No triangle';
NoTriangle.args = {
  ...defaultArgs,
  style: { maxWidth: 400 },
  triangleBorderColor: 'transparent',
  triangleColor: 'transparent',
};

export const Squared = Template.bind({});
Squared.args = {
  ...defaultArgs,
  color: 'primary',
  style: { maxWidth: 400 },
  squared: true,
};

export const Unbordered = Template.bind({});
Unbordered.args = {
  ...defaultArgs,
  color: 'primary',
  style: { maxWidth: 400 },
  triangleSize: 8,
  unbordered: true,
};

export const Styled = Template.bind({});
Styled.storyName = 'Custom styles';
Styled.args = {
  ...defaultArgs,
  style: {
    '--shade-primary-color': themes.light['color-P50'],
    '--shade-opaque-primary-color': themes.light['color-P50-shade'],
    '--status-bubble-state-color': themes.light['color-P50'],
    '--status-bubble-state-contrast-color': themes.light['color-P50-contrast'],
  } as React.CSSProperties,
  triangleBorderColor: themes.light['color-P50-D10'],
  triangleColor: themes.light['color-P50-shade'],
  unthemed: true,
};
