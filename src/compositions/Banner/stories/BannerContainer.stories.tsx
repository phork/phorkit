import { action } from '@storybook/addon-actions';
import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Banner } from '../Banner';
import { BannerContainer } from '../BannerContainer';

export default {
  title: 'Feedback/Banners/BannerContainer',
  component: BannerContainer,
  argTypes: {
    children: {
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
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="compositions/Banner" title="BannerContainer" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof BannerContainer>;

const Template: ComponentStory<typeof BannerContainer> = args => <BannerContainer {...args} />;

const defaultArgs = {
  children: (
    <React.Fragment>
      <Banner immediate level="info" onClose={action('closed banner')}>
        This is an info banner because something interesting happened. Exciting!
      </Banner>
      <Banner immediate level="info" onClose={action('closed banner')}>
        This is another info banner. It has a border to distinguish it from the one above.
      </Banner>
    </React.Fragment>
  ),
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['BannerContainer.test.js'],
};
*/

export const State = Template.bind({});
State.storyName = 'State banners';
State.args = {
  ...defaultArgs,
  children: (
    <React.Fragment>
      <Banner immediate level="info" onClose={action('closed banner')}>
        This is an info banner because something interesting happened. Exciting!
      </Banner>
      <Banner immediate level="info" onClose={action('closed banner')}>
        This is another info banner. It has a border to distinguish it from the one above.
      </Banner>
      <Banner immediate level="danger" onClose={action('closed banner')}>
        This is a danger banner because something bad happened. Uh oh!
      </Banner>
      <Banner immediate level="danger" onClose={action('closed banner')}>
        This is another danger banner. It has a border to distinguish it from the one above.
      </Banner>
      <Banner immediate level="warning" onClose={action('closed banner')}>
        This is a warning banner because something not so great happened. Meh.
      </Banner>
      <Banner immediate level="warning" onClose={action('closed banner')}>
        This is another warning banner. It has a border to distinguish it from the one above.
      </Banner>
      <Banner immediate level="success" onClose={action('closed banner')}>
        This is a success banner because something excellent happened. Yay!
      </Banner>
      <Banner immediate level="success" onClose={action('closed banner')}>
        This is another success banner. It has a border to distinguish it from the one above.
      </Banner>
      <Banner immediate level="contrast" onClose={action('closed banner')}>
        This is a contrast banner.
      </Banner>
      <Banner immediate level="contrast" onClose={action('closed banner')}>
        This is another contrast banner. It has a border to distinguish it from the one above.
      </Banner>
    </React.Fragment>
  ),
};

export const Page = Template.bind({});
Page.storyName = 'Page banners';
Page.args = {
  ...defaultArgs,
  children: (
    <React.Fragment>
      <Banner immediate level="primary" onClose={action('closed banner')}>
        This is a primary banner.
      </Banner>
      <Banner immediate level="primary" onClose={action('closed banner')}>
        This is another primary banner. It has a border to distinguish it from the one above.
      </Banner>
      <Banner immediate level="secondary" onClose={action('closed banner')}>
        This is a secondary banner.
      </Banner>
      <Banner immediate level="secondary" onClose={action('closed banner')}>
        This is another secondary banner. It has a border to distinguish it from the one above.
      </Banner>
      <Banner immediate level="tertiary" onClose={action('closed banner')}>
        This is a tertiary banner.
      </Banner>
      <Banner immediate level="tertiary" onClose={action('closed banner')}>
        This is another tertiary banner. It has a border to distinguish it from the one above.
      </Banner>
      <Banner immediate level="transparent" onClose={action('closed banner')}>
        <Typography color="primary">This is a transparent banner.</Typography>
      </Banner>
      <Banner immediate level="transparent" onClose={action('closed banner')}>
        <Typography color="primary">
          This is another transparent banner. It has a border to distinguish it from the one above.
        </Typography>
      </Banner>
    </React.Fragment>
  ),
};
