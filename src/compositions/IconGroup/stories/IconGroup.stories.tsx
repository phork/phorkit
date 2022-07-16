import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { TimesIcon } from 'icons/TimesIcon';
import { Rhythm } from 'components/Rhythm/Rhythm';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { IconGroup, IconGroupProps } from '../IconGroup';

export default {
  title: 'Display/IconGroup',
  component: IconGroup,
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },

    scale: {
      table: {
        category: 'Appearance',
      },
    },
    size: {
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
          <PageTitle src="compositions/IconGroup" title="IconGroup" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof IconGroup>;

const Template: ComponentStory<typeof IconGroup> = args => <IconGroup {...args} />;

const defaultArgs = {
  children: (
    <Rhythm m={2}>
      <TimesIcon />
      <TimesIcon />
      <TimesIcon />
      <TimesIcon />
      <TimesIcon />
      <TimesIcon />
    </Rhythm>
  ),
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  scale: 'medium' as IconGroupProps['scale'],
};

/*
Default.parameters = {
  jest: ['IconGroup.test.js'],
};
*/

export const SmallScale = Template.bind({});
SmallScale.storyName = 'Scale: Small';
SmallScale.args = {
  ...defaultArgs,
  scale: 'small',
};

export const MediumScale = Template.bind({});
MediumScale.storyName = 'Scale: Medium';
MediumScale.args = {
  ...defaultArgs,
  scale: 'medium',
};

export const LargeScale = Template.bind({});
LargeScale.storyName = 'Scale: Large';
LargeScale.args = {
  ...defaultArgs,
  scale: 'large',
};

export const XLargeScale = Template.bind({});
XLargeScale.storyName = 'Scale: XLargeScale';
XLargeScale.args = {
  ...defaultArgs,
  scale: 'xlarge',
};

export const ByPixel = Template.bind({});
ByPixel.storyName = 'By pixel';
ByPixel.args = {
  ...defaultArgs,
  size: 18,
};

export const ByEm = Template.bind({});
ByEm.storyName = 'By em';
ByEm.args = {
  ...defaultArgs,
  size: '1em',
};
