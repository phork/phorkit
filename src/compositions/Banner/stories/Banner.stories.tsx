import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Banner, BannerProps } from '../Banner';

export default {
  title: 'Display/Banner',
  component: Banner,
  argTypes: {
    children: {
      control: { type: 'text' },
    },

    className: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon controls',
      },
    },
    contextId: {
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
    unthemed: {
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
          <PageTitle src="compositions/Banner" title="Banner" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      description: {
        component: 'A banner spans the full width of the page with a text notification.',
      },
    },
  },
} as ComponentMeta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = args => <Banner {...args} />;

const defaultArgs = {
  children: 'This is a wonderfully fun banner.',
  contrast: false,
  immediate: true,
  level: 'info' as BannerProps['level'],
  scrollbar: 'medium' as BannerProps['scrollbar'],
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
