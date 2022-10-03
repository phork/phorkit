import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { themes } from 'config/themes';
import { Divider } from 'components/Divider';
import { Paper } from 'components/Paper';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { AvatarStatusBubble, AvatarStatusBubbleProps } from '../AvatarStatusBubble';
import statusBubbleStory from './StatusBubble.stories';

export default {
  ...statusBubbleStory,
  title: 'Display/StatusBubble/AvatarStatusBubble',
  component: AvatarStatusBubble,
  argTypes: {
    ...statusBubbleStory.argTypes,
    anchor: {
      table: {
        disable: true,
      },
    },

    avatarColor: {
      table: {
        category: 'Appearance',
      },
    },
    imgSrc: {
      table: {
        category: 'Appearance',
      },
    },
    initials: {
      table: {
        category: 'Appearance',
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
          <PageTitle src="compositions/StatusBubble" title="AvatarStatusBubble" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof AvatarStatusBubble>;

const Template: ComponentStory<typeof AvatarStatusBubble> = args => <AvatarStatusBubble {...args} />;

const defaultArgs = {
  children: (
    <Paper color="primary">
      <Rhythm p={4}>Hello world</Rhythm>
    </Paper>
  ),
  color: 'neutral' as AvatarStatusBubbleProps['color'],
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
  imgSrc: '/images/avatar.jpg',
  initials: 'P',
  position: 'right-top' as AvatarStatusBubbleProps['position'],
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['AvatarStatusBubble.test.js', 'StatusBubble.test.js'],
};
*/

export const PrimaryAvatarColor = Template.bind({});
PrimaryAvatarColor.storyName = 'Avatar color: Primary';
PrimaryAvatarColor.args = {
  ...defaultArgs,
  avatarColor: 'primary',
  color: 'primary',
  imgSrc: undefined,
};

export const NeutralAvatarColor = Template.bind({});
NeutralAvatarColor.storyName = 'Avatar color: Neutral';
NeutralAvatarColor.args = {
  ...defaultArgs,
  avatarColor: 'neutral',
  color: 'neutral',
  imgSrc: undefined,
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

export const AvatarAvatar = Template.bind({});
AvatarAvatar.args = {
  ...defaultArgs,
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
  imgSrc: undefined,
  style: {
    '--avatar-background-color': themes.light['color-P50'],
    '--avatar-text-color': themes.light['color-P50-contrast'],
    '--shade-primary-color': themes.light['color-P50'],
    '--shade-opaque-primary-color': themes.light['color-P50-shade'],
    '--status-bubble-state-color': themes.light['color-P50'],
    '--status-bubble-state-contrast-color': themes.light['color-P50-contrast'],
  } as React.CSSProperties,
  triangleBorderColor: themes.light['color-P50-D10'],
  triangleColor: themes.light['color-P50-shade'],
  unthemed: true,
};
