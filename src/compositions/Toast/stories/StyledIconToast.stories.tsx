import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { CheckIcon } from 'icons/internal/CheckIcon';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledIconToast } from '../StyledIconToast';
import badgeStory from './Toast.stories';

export default {
  ...badgeStory,
  title: 'Feedback/Toasts/StyledIconToast',
  component: StyledIconToast,
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
          <PageTitle src="compositions/Toast" title="StyledIconToast" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledIconToast>;

const Template: ComponentStory<typeof StyledIconToast> = args => <StyledIconToast {...args} />;

const defaultArgs = {
  children: 'This is a wonderfully fun toast.',
  icon: CheckIcon,
  iconSize: 20,
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
  contrast: { table: { disable: true } },
  level: { table: { disable: true } },
  style: { table: { disable: true } },
  themeId: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
