import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Card } from '../Card';

export default {
  title: 'Surfaces/Card',
  component: Card,
  argTypes: {
    bordered: {
      table: {
        category: 'Appearance',
      },
    },
    children: {
      control: {
        disable: true,
      },
      table: {
        category: 'Appearance',
      },
    },
    full: {
      table: {
        category: 'Appearance',
      },
    },
    hoverable: {
      table: {
        category: 'Appearance',
      },
    },
    magnify: {
      table: {
        category: 'Appearance',
      },
    },
    raised: {
      options: [false, 10, 20, 30, 40, 100],
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    squared: {
      table: {
        category: 'Appearance',
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
          <PageTitle src="components/Card" title="Card" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = args => <Card {...args} />;

const defaultArgs = {
  bordered: false,
  children: (
    <Typography<'div'>
      as="div"
      color="primary"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 200, height: 200 }}
    >
      Hello world
    </Typography>
  ),
  full: false,
  hoverable: false,
  magnify: false,
  raised: false,
  squared: false,
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Card.test.js'],
};
*/

export const Bordered = Template.bind({});
Bordered.args = {
  ...defaultArgs,
  bordered: true,
};

export const Squared = Template.bind({});
Squared.args = {
  ...defaultArgs,
  bordered: true,
  squared: true,
};

export const Raised = Template.bind({});
Raised.args = {
  ...defaultArgs,
  raised: 10,
};

export const Hoverable = Template.bind({});
Hoverable.args = {
  ...defaultArgs,
  hoverable: true,
  raised: 10,
};
