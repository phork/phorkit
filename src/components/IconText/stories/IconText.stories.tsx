import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { TimesIcon } from 'icons/TimesIcon';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { IconText, IconTextProps } from '../IconText';

export default {
  title: 'Display/IconText',
  component: IconText,
  argTypes: {
    icon: {
      options: ['small', 'medium', 'large'],
      control: {
        labels: {
          small: '<TimesIcon scale="small" />',
          medium: '<TimesIcon scale="medium" />',
          large: '<TimesIcon scale="large" />',
        },
      },
      table: {
        category: 'Appearance',
      },
    },
    inline: {
      table: {
        category: 'Appearance',
      },
    },
    reverse: {
      table: {
        category: 'Appearance',
      },
    },
    text: {
      control: {
        type: 'text',
      },
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
    iconClassName: {
      table: {
        category: 'Uncommon',
      },
    },
    textClassName: {
      table: {
        category: 'Uncommon',
      },
    },
    style: {
      table: {
        category: 'Uncommon',
      },
    },
  },
  decorators: [
    Story => (
      <Typography<'div'> as="div" color="primary">
        {Story()}
      </Typography>
    ),
  ],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="components/IconText" title="IconText" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof IconText>;

const Template: ComponentStory<
  (args: Omit<IconTextProps, 'icon'> & { icon: 'small' | 'medium' | 'large' }) => ReturnType<typeof IconText>
> = ({ icon = 'small', ...args }) => <IconText icon={<TimesIcon scale={icon} />} {...args} />;

const defaultArgs = {
  inline: false,
  reverse: false,
  text: 'Hello world',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['IconText.test.js'],
};
*/

export const InlineReverse = Template.bind({});
InlineReverse.storyName = 'Inline reverse';
InlineReverse.args = {
  ...defaultArgs,
  inline: true,
  reverse: true,
};

export const Spaced = Template.bind({});
Spaced.args = {
  ...defaultArgs,
  text: <Rhythm ml={2}>Hello world</Rhythm>,
};
