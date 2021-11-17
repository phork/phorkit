import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { ThemeColorIds } from 'config/themes';
import { PageTitle } from 'stories/helpers/PageTitle';
import { getPrimaryColorIds } from 'stories/helpers/utils';
import { ColoredAvatar, ColoredAvatarProps } from '../ColoredAvatar';
import avatarStory from './Avatar.stories';

const argTypes = { ...avatarStory.argTypes };
delete argTypes.color;
delete argTypes.contrast;

export default {
  ...avatarStory,
  title: 'Display/Avatar/ColoredAvatar',
  component: ColoredAvatar,
  argTypes: {
    colorId: {
      options: getPrimaryColorIds('light'),
      control: {
        type: 'select',
      },
      table: {
        category: 'Color',
      },
    },
    ...argTypes,
  },
  parameters: {
    ...avatarStory.parameters,
    docs: {
      ...avatarStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Avatar" title="ColoredAvatar" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof ColoredAvatar>;

const Template: ComponentStory<(args: ColoredAvatarProps) => ReturnType<typeof ColoredAvatar>> = args => (
  <ColoredAvatar {...args} />
);

const defaultArgs = {
  actionable: false,
  colorId: 'P60' as ThemeColorIds,
  initials: 'EC',
  size: 'medium' as ColoredAvatarProps['size'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

Default.parameters = {
  jest: ['ColoredAvatar.test.js'],
};

Default.argTypes = {
  as: { table: { disable: true } },
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};

export const ColorP00 = Template.bind({});
ColorP00.storyName = 'Color: P00';
ColorP00.args = {
  ...defaultArgs,
  colorId: 'P00' as ThemeColorIds,
};

export const ColorP05 = Template.bind({});
ColorP05.storyName = 'Color: P05';
ColorP05.args = {
  ...defaultArgs,
  colorId: 'P05' as ThemeColorIds,
};

export const ColorP10 = Template.bind({});
ColorP10.storyName = 'Color: P10';
ColorP10.args = {
  ...defaultArgs,
  colorId: 'P10' as ThemeColorIds,
};

export const ColorP15 = Template.bind({});
ColorP15.storyName = 'Color: P15';
ColorP15.args = {
  ...defaultArgs,
  colorId: 'P15' as ThemeColorIds,
};

export const ColorP20 = Template.bind({});
ColorP20.storyName = 'Color: P20';
ColorP20.args = {
  ...defaultArgs,
  colorId: 'P20' as ThemeColorIds,
};

export const ColorP25 = Template.bind({});
ColorP25.storyName = 'Color: P25';
ColorP25.args = {
  ...defaultArgs,
  colorId: 'P25' as ThemeColorIds,
};

export const ColorP30 = Template.bind({});
ColorP30.storyName = 'Color: P30';
ColorP30.args = {
  ...defaultArgs,
  colorId: 'P30' as ThemeColorIds,
};

export const ColorP35 = Template.bind({});
ColorP35.storyName = 'Color: P35';
ColorP35.args = {
  ...defaultArgs,
  colorId: 'P35' as ThemeColorIds,
};

export const ColorP40 = Template.bind({});
ColorP40.storyName = 'Color: P40';
ColorP40.args = {
  ...defaultArgs,
  colorId: 'P40' as ThemeColorIds,
};

export const ColorP45 = Template.bind({});
ColorP45.storyName = 'Color: P45';
ColorP45.args = {
  ...defaultArgs,
  colorId: 'P45' as ThemeColorIds,
};

export const ColorP50 = Template.bind({});
ColorP50.storyName = 'Color: P50';
ColorP50.args = {
  ...defaultArgs,
  colorId: 'P50' as ThemeColorIds,
};

export const ColorP55 = Template.bind({});
ColorP55.storyName = 'Color: P55';
ColorP55.args = {
  ...defaultArgs,
  colorId: 'P55' as ThemeColorIds,
};

export const ColorP60 = Template.bind({});
ColorP60.storyName = 'Color: P60';
ColorP60.args = {
  ...defaultArgs,
  colorId: 'P60' as ThemeColorIds,
};

export const ColorP65 = Template.bind({});
ColorP65.storyName = 'Color: P65';
ColorP65.args = {
  ...defaultArgs,
  colorId: 'P65' as ThemeColorIds,
};

export const ColorP70 = Template.bind({});
ColorP70.storyName = 'Color: P70';
ColorP70.args = {
  ...defaultArgs,
  colorId: 'P70' as ThemeColorIds,
};
