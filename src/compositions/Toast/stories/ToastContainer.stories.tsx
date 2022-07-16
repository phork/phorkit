import { action } from '@storybook/addon-actions';
import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Flex } from 'components/Flex/Flex';
import { Typography } from 'components/Typography/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Toast } from '../Toast';
import { ToastContainer } from '../ToastContainer';

export default {
  title: 'Feedback/Toasts/ToastContainer',
  component: ToastContainer,
  argTypes: {
    children: {
      control: {
        disable: true,
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
  },
  decorators: [
    Story => (
      <Flex full alignItems="center" justifyContent="center">
        <Typography color="primary" size="large" variants="italic" volume="quietest">
          See the edge of the page
        </Typography>
        <Story />
      </Flex>
    ),
  ],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="compositions/Toast" title="ToastContainer" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof ToastContainer>;

const Template: ComponentStory<typeof ToastContainer> = args => <ToastContainer {...args} />;

const defaultArgs = {
  children: (
    <React.Fragment>
      <Toast immediate level="info" onClose={action('closed toast')}>
        This is an info toast because something interesting happened. Exciting!
      </Toast>
      <Toast immediate level="danger" onClose={action('closed toast')}>
        This is a danger toast because something bad happened. Uh oh!
      </Toast>
      <Toast immediate level="warning" onClose={action('closed toast')}>
        This is a warning toast because something not so great happened. Meh.
      </Toast>
      <Toast immediate level="success" onClose={action('closed toast')}>
        This is a success toast because something excellent happened. Yay!
      </Toast>
    </React.Fragment>
  ),
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  position: 'bottom-right',
};

/*
Default.parameters = {
  jest: ['ToastContainer.test.js'],
};
*/
