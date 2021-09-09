import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Link } from '../Link';

export default {
  title: 'Navigation/Link',
  component: Link,
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    block: {
      control: { type: 'text' },
    },
    href: {
      table: {
        category: 'Primary controls',
      },
    },
    target: {
      table: {
        category: 'Primary controls',
      },
    },
    underline: {
      table: {
        category: 'Primary controls',
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
    unstyled: {
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
  decorators: [Story => <Typography size="large">Hello world. {Story()}</Typography>],
  parameters: {
    controls: {
      exclude: ['className', 'themeId'],
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Link" title="Link" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      description: {
        component: 'The link component can style links directly, or it can style links within a container.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = args => <Link {...args} />;

const defaultArgs = {
  children: 'I am a link.',
  href: 'https://phorkit.org',
  target: '_blank',
  underline: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Block = Template.bind({});
Block.args = {
  ...defaultArgs,
  block: true,
};

export const Underlined = Template.bind({});
Underlined.args = {
  ...defaultArgs,
  underline: true,
};

export const Unstyled = Template.bind({});
Unstyled.args = {
  ...defaultArgs,
  unstyled: true,
  unthemed: true,
};
