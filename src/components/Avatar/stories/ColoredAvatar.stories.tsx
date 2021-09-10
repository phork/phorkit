import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { ThemeColorIds } from 'config/themes';
import { PageTitle } from 'stories/helpers/PageTitle';
import { getPrimaryColorIds } from 'stories/helpers/utils';
import { ColoredAvatar, ColoredAvatarProps } from '../ColoredAvatar';
import avatarStory from './Avatar.stories';

export default {
  ...avatarStory,
  title: 'Display/Avatar/ColoredAvatar',
  component: ColoredAvatar,
  argTypes: {
    colorId: {
      options: getPrimaryColorIds('light'),
      control: { type: 'select' },
      table: {
        category: 'Color controls',
      },
    },
    ...avatarStory.argTypes,
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

const Template: ComponentStory<typeof ColoredAvatar> = args => <ColoredAvatar {...args} />;

const defaultArgs = {
  actionable: false,
  color: undefined,
  colorId: 'P60' as ThemeColorIds,
  initials: 'EC',
  size: 'medium' as ColoredAvatarProps['size'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

Default.argTypes = {
  as: { table: { disable: true } },
  color: { table: { disable: true } },
  contrast: { table: { disable: true } },
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
