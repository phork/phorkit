import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledTitledToast } from '../StyledTitledToast';
import badgeStory from './Toast.stories';

export default {
  ...badgeStory,
  title: 'Feedback/Toasts/StyledTitledToast',
  component: StyledTitledToast,
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
          <PageTitle src="compositions/Toast" title="StyledTitledToast" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledTitledToast>;

const Template: ComponentStory<typeof StyledTitledToast> = args => <StyledTitledToast {...args} />;

const defaultArgs = {
  children: 'This is a wonderfully fun toast.',
  immediate: true,
  levelColor: '#556270',
  levelInverseColor: '#fff',
  title: 'Hello world',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

Default.argTypes = {
  style: { table: { disable: true } },
  themeId: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
