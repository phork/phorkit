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
      control: {
        type: 'text',
      },
    },

    underline: {
      table: {
        category: 'Appearance',
      },
    },
    block: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Appearance',
      },
    },

    href: {
      table: {
        category: 'Anchor',
      },
    },
    target: {
      table: {
        category: 'Anchor',
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
    unstyled: {
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
      page: LinkDocumentation,
    },
  },
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = args => <Link {...args} />;

const defaultArgs = {
  children: 'I am a link.',
  contrast: false,
  href: 'https://phorkit.org',
  target: '_blank',
  underline: false,
  unstyled: false,
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Link.test.js'],
};
*/

const displayDecorators: typeof Default.decorators = [
  Story => (
    <Typography color="primary" size="large">
      Hello world. {Story()}
    </Typography>
  ),
];

export const Inline = Template.bind({});
Inline.decorators = displayDecorators;
Inline.args = {
  ...defaultArgs,
};

Inline.parameters = {
  docs: {
    source: {
      excludeDecorators: false,
    },
  },
};

export const Block = Template.bind({});
Block.decorators = displayDecorators;
Block.args = {
  ...defaultArgs,
  block: true,
};

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
