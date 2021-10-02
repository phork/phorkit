import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledToast } from '../StyledToast';
import badgeStory from './Toast.stories';

export default {
  ...badgeStory,
  title: 'Feedback/Toasts/StyledToast',
  component: StyledToast,
  argTypes: {
    levelColor: {
      table: {
        category: 'Styled',
      },
    },
    levelInverseColor: {
      table: {
        category: 'Styled',
      },
    },
    ...badgeStory.argTypes,
  },
  parameters: {
    ...badgeStory.parameters,
    docs: {
      ...badgeStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="compositions/Toast" title="StyledToast" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledToast>;

const Template: ComponentStory<typeof StyledToast> = args => <StyledToast {...args} />;

const defaultArgs = {
  children: 'This is a wonderfully fun toast.',
  immediate: true,
  levelColor: '#556270',
  levelInverseColor: '#fff',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

Default.argTypes = {
  contrast: { table: { disable: true } },
  level: { table: { disable: true } },
  style: { table: { disable: true } },
  themeId: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
