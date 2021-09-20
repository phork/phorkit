import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Notification } from '../Notification';

export default {
  title: 'Form/Notification',
  component: Notification,
  argTypes: {
    children: {
      control: { type: 'text' },
    },

    color: {
      table: {
        category: 'Appearance controls',
      },
    },
    divided: {
      table: {
        category: 'Appearance controls',
      },
    },
    hideNotification: {
      table: {
        category: 'Appearance controls',
      },
    },
    notification: {
      table: {
        category: 'Appearance controls',
      },
    },
    width: {
      table: {
        category: 'Appearance controls',
      },
    },

    className: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon controls',
      },
    },
    contrast: {
      table: {
        category: 'Uncommon controls',
      },
    },
    style: {
      table: {
        category: 'Uncommon controls',
      },
    },
    themeId: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon controls',
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
          <PageTitle src="components/Form/Notification" title="Notification" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      description: {
        component: 'To supplement form inputs with notifications, warnings and errors.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = args => <Notification {...args} />;

const defaultArgs = {
  children: 'Content that the notification refers to.',
  contrast: false,
  divided: false,
  hideNotification: false,
  notification: 'A simple notification',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const DividedNotification = Template.bind({});
DividedNotification.args = {
  ...defaultArgs,
  divided: true,
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
