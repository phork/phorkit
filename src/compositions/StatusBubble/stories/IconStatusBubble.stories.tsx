import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PhorkIcon } from 'icons/PhorkIcon';
import { Avatar } from 'components/Avatar';
import { Divider } from 'components/Divider';
import { Paper } from 'components/Paper';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { IconStatusBubble, IconStatusBubbleProps } from '../IconStatusBubble';

export default {
  title: 'Display/StatusBubble/IconStatusBubble',
  component: IconStatusBubble,
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
    header: {
      control: {
        disable: true,
      },
      table: {
        category: 'Appearance',
      },
    },
    icon: {
      options: ['icon', 'avatar'],
      control: {
        labels: {
          icon: '<PhorkIcon scale="large" />',
          avatar: '<Avatar initials="EC" />',
        },
      },
      table: {
        category: 'Appearance',
      },
    },
    iconShape: {
      control: {
        type: 'inline-radio',
      },
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
          <PageTitle src="compositions/StatusBubble" title="IconStatusBubble" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof IconStatusBubble>;

const Template: ComponentStory<
  (args: Omit<IconStatusBubbleProps, 'icon'> & { icon: 'icon' | 'avatar' }) => ReturnType<typeof IconStatusBubble>
> = ({ icon = 'icon', iconShape, ...args }) => (
  <IconStatusBubble
    icon={
      icon === 'avatar' ? (
        <Avatar imgSrc="/images/avatar.jpg" initials="EC" size="large" />
      ) : (
        <PhorkIcon scale="large" />
      )
    }
    iconShape={icon === 'avatar' ? 'circle' : iconShape}
    {...args}
  />
);

const defaultArgs = {
  children: (
    <Paper color="primary">
      <Rhythm p={4}>Hello world</Rhythm>
    </Paper>
  ),
  color: 'neutral' as IconStatusBubbleProps['color'],
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
  iconShape: 'square' as IconStatusBubbleProps['iconShape'],
  position: 'right-top' as IconStatusBubbleProps['position'],
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

Default.parameters = {
  jest: ['StatusBubble.test.js'],
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

export const AvatarIcon = Template.bind({});
AvatarIcon.args = {
  ...defaultArgs,
  icon: 'avatar',
  iconShape: 'circle',
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
