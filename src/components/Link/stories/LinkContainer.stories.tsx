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
        category: 'Primary controls',
      },
    },

    as: {
      table: {
        category: 'Uncommon controls',
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
          <PageTitle src="components/LinkContainer" title="LinkContainer" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      description: {
        component: 'A link container wraps children that contain anchor tag(s) and styles those anchors.',
      },
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
