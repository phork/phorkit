import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Typography } from 'components/Typography';
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
  },
} as ComponentMeta<typeof LinkContainer>;

const Template: ComponentStory<typeof LinkContainer> = args => <LinkContainer {...args} />;

const defaultArgs = {
  children: (
    <a href="http://phorkit.org" rel="noreferrer" target="_blank">
      I am a link within a LinkContainer.
    </a>
  ),
  contrast: false,
  underline: false,
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['LinkContainer.test.js'],
};
*/

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
    <Typography color="primary">
      Hello world.{' '}
      <a href="http://phorkit.org" rel="noreferrer" target="_blank">
        I am a link within a LinkContainer.
      </a>{' '}
      I also have a paragraph wrapper.
    </Typography>
  ),
};
