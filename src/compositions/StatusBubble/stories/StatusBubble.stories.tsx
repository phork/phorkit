import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { BlobbrIcon } from 'icons/internal/BlobbrIcon';
import { Avatar } from 'components/Avatar';
import { Paper } from 'components/Paper';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StatusBubble, StatusBubbleProps } from '../StatusBubble';

export default {
  title: 'Display/StatusBubble',
  component: StatusBubble,
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
          icon: '<BlobbrIcon scale="large" />',
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
    layout: 'centered',
  },
} as ComponentMeta<typeof StatusBubble>;

const Template: ComponentStory<
  (args: Omit<StatusBubbleProps, 'icon'> & { icon: 'icon' | 'avatar' }) => ReturnType<typeof StatusBubble>
> = ({ icon = 'icon', iconShape, ...args }) => (
  <StatusBubble
    icon={
      icon === 'avatar' ? (
        <Avatar imgSrc="/images/avatar.jpg" initials="EC" size="large" />
      ) : (
        <BlobbrIcon scale="large" />
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
  color: 'neutral' as StatusBubbleProps['color'],
  header: (
    <React.Fragment>
      <Typography weight="bold">Something cool happened</Typography>
      <Typography volume="quiet">Yesterday</Typography>
    </React.Fragment>
  ),
  iconShape: 'square' as StatusBubbleProps['iconShape'],
  position: 'right-top' as StatusBubbleProps['position'],
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
    <Paper color="primary">
      <Rhythm px={4} py={3}>
        Hello world
        <br />
        Hello world
        <br />
        Hello world
      </Rhythm>
    </Paper>
  ),
};

export const NoChildren = Template.bind({});
NoChildren.storyName = 'No children';
NoChildren.args = {
  ...defaultArgs,
  children: undefined,
};
