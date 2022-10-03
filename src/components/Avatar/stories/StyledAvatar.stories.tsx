import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledAvatar, StyledAvatarProps } from '../StyledAvatar';
import avatarStory from './Avatar.stories';

const argTypes = { ...avatarStory.argTypes };
delete argTypes.color;
delete argTypes.contrast;
delete argTypes.themeId;

export default {
  ...avatarStory,
  title: 'Display/Avatar/StyledAvatar',
  component: StyledAvatar,
  argTypes: {
    backgroundColor: {
      table: {
        category: 'Styled',
      },
    },
    textColor: {
      table: {
        category: 'Styled',
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
          <PageTitle src="components/Avatar" title="StyledAvatar" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledAvatar>;

const Template: ComponentStory<typeof StyledAvatar> = args => <StyledAvatar {...args} />;

const defaultArgs = {
  actionable: false,
  backgroundColor: '#556270',
  initials: 'P',
  size: 'medium' as StyledAvatarProps['size'],
  textColor: '#fff',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StyledAvatar.test.js', 'Avatar.test.js'],
};
*/

Default.argTypes = {
  as: { table: { disable: true } },
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};

export const CustomSize = Template.bind({});
CustomSize.storyName = 'Custom size';
CustomSize.args = {
  ...defaultArgs,
  size: 'custom',
  style: { '--avatar-size': '72px', '--avatar-font-size': '24px' } as React.CSSProperties,
};
