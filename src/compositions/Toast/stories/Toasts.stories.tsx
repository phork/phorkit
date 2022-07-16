import { action } from '@storybook/addon-actions';
import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Button } from 'components/Button/Button';
import { ButtonGroup } from 'components/Button/ButtonGroup';
import { PageTitle } from 'stories/helpers/PageTitle';
import { ToastsProps } from '../..';
import { Toast } from '../Toast';
import { ToastConsumer } from '../ToastConsumer';
import { Toasts } from '../Toasts';

export default {
  title: 'Feedback/Toasts',
  component: Toasts,
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
    variant: {
      options: ['colored', undefined],
      table: {
        category: 'Appearance',
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
          <PageTitle src="compositions/Toast" title="Toasts" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof Toasts>;

const Template: ComponentStory<typeof Toasts> = args => (
  <Toasts {...args}>
    <ToastConsumer>
      {({ createNotification, clearNotifications }) => (
        <ButtonGroup spacing="cozy">
          <Button
            color="primary"
            key="primary"
            onClick={() =>
              createNotification(
                <Toast level="info" onClose={() => action('closed toast')}>
                  This is an info toast because something interesting happened. Exciting!
                </Toast>,
              )
            }
            shape="brick"
          >
            Info toast
          </Button>
          <Button
            color="success"
            key="success"
            onClick={() =>
              createNotification(
                <Toast
                  contextId="demo-toast-success"
                  key="success"
                  level="success"
                  onClose={(_event, contextId) => action(`closed ${contextId}`)}
                >
                  This is an overwriting success toast because it has got a contextId. Yay!
                  <div style={{ position: 'absolute', right: '8px', fontSize: '10px', opacity: 0.4 }}>{Date.now()}</div>
                </Toast>,
              )
            }
            shape="brick"
          >
            Success toast
          </Button>
          <Button
            color="warning"
            key="warning"
            onClick={() =>
              createNotification(
                <Toast permanent level="warning" onClose={() => action('closed toast')}>
                  This is a permanent warning toast because something not so great happened. Meh.
                </Toast>,
              )
            }
            shape="brick"
          >
            Warning toast
          </Button>
          <Button
            color="danger"
            key="danger"
            onClick={() =>
              createNotification(
                <Toast level="danger" onClose={() => action('closed toast')}>
                  This is a danger toast because something bad happened. Uh oh!
                </Toast>,
              )
            }
            shape="brick"
          >
            Danger toast
          </Button>
          <Button color="neutral" key="neutral" onClick={() => clearNotifications()} shape="brick">
            Clear all
          </Button>
        </ButtonGroup>
      )}
    </ToastConsumer>
  </Toasts>
);

const defaultArgs = {
  position: 'bottom-right' as ToastsProps['position'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Toast.test.js', 'ToastContainer.text.js'],
};
*/
