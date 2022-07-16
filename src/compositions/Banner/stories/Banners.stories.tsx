import { action } from '@storybook/addon-actions';
import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Button } from 'components/Button/Button';
import { ButtonGroup } from 'components/Button/ButtonGroup';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Banner } from '../Banner';
import { BannerConsumer } from '../BannerConsumer';
import { Banners } from '../Banners';

export default {
  title: 'Feedback/Banners',
  component: Banners,
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },

    bannerStyle: {
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
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="compositions/Banner" title="Banners" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof Banners>;

const Template: ComponentStory<typeof Banners> = ({ style, ...args }) => (
  <Banners style={{ marginTop: '18px', ...style }} {...args}>
    <BannerConsumer>
      {({ createNotification, clearNotifications }) => (
        <ButtonGroup spacing="cozy">
          <Button
            color="primary"
            key="primary"
            onClick={() =>
              createNotification(
                <Banner level="info" onClose={() => action('closed banner')}>
                  This is an info banner because something interesting happened. Exciting!
                </Banner>,
              )
            }
            shape="brick"
          >
            Info banner
          </Button>
          <Button
            color="danger"
            key="danger"
            onClick={() =>
              createNotification(
                <Banner level="danger" onClose={() => action('closed banner')}>
                  This is a danger banner because something bad happened. Uh oh!
                </Banner>,
              )
            }
            shape="brick"
          >
            Danger banner
          </Button>
          <Button
            color="warning"
            key="warning"
            onClick={() =>
              createNotification(
                <Banner permanent level="warning" onClose={() => action('closed banner')}>
                  This is a permanent warning banner because something not so great happened. Meh.
                </Banner>,
              )
            }
            shape="brick"
          >
            Warning banner
          </Button>
          <Button
            color="success"
            key="success"
            onClick={() =>
              createNotification(
                <Banner
                  contextId="demo-banner-success"
                  level="success"
                  onClose={(_event, contextId) => action(`closed ${contextId}`)}
                >
                  This is an overwriting success banner because it has got a contextId. Yay!
                  <div style={{ position: 'absolute', right: '8px', fontSize: '10px', opacity: 0.4 }}>{Date.now()}</div>
                </Banner>,
              )
            }
            shape="brick"
          >
            Success banner
          </Button>
          <Button color="neutral" key="neutral" onClick={() => clearNotifications()} shape="brick">
            Clear all
          </Button>
        </ButtonGroup>
      )}
    </BannerConsumer>
  </Banners>
);

const defaultArgs = {};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Banner.test.js', 'BannerContainer.test.js'],
};
*/
