import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Typography } from 'components/Typography';
import { Link } from '../Link';
import LinkDocumentation from './Link.docs.mdx';

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
  parameters: {
    controls: {
      exclude: ['className', 'themeId'],
      sort: 'requiredFirst',
    },
    docs: {
      page: LinkDocumentation,
      description: {
        component: 'The link component adds styles to an anchor tag.',
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

export const Inline = Template.bind({});
Inline.args = {
  ...defaultArgs,
};

Inline.decorators = [Story => <Typography size="large">Hello world. {Story()}</Typography>];
Inline.parameters = {
  docs: {
    source: {
      excludeDecorators: false,
    },
  },
};

export const Block = Template.bind({});
Block.args = {
  ...defaultArgs,
  block: true,
};

Block.decorators = [Story => <Typography size="large">Hello world. {Story()}</Typography>];
Block.parameters = {
  docs: {
    source: {
      excludeDecorators: false,
    },
  },
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
