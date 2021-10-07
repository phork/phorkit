import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { LinkContainer } from '../LinkContainer';

export default {
  title: 'Navigation/Link/LinkContainer',
  component: LinkContainer,
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },

    underline: {
      table: {
        category: 'Appearance',
      },
    },

    as: {
      table: {
        category: 'Uncommon',
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
    contrast: {
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
          <PageTitle src="components/LinkContainer" title="LinkContainer" />
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
} as ComponentMeta<typeof LinkContainer>;

const Template: ComponentStory<typeof LinkContainer> = args => <LinkContainer {...args} />;

const defaultArgs = {
  children: (
    <a href="http://phork.org" target="_blank">
      I am a link within a LinkContainer.
    </a>
  ),
  underline: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Underlined = Template.bind({});
Underlined.args = {
  ...defaultArgs,
  underline: true,
};

export const Paragraph = Template.bind({});
Paragraph.args = {
  ...defaultArgs,
  as: 'p',
  children: (
    <React.Fragment>
      Hello world.{' '}
      <a href="http://phork.org" target="_blank">
        I am a link within a LinkContainer.
      </a>{' '}
      I also have a paragraph wrapper.
    </React.Fragment>
  ),
};
