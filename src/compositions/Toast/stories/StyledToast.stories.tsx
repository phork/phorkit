import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledToast } from '../StyledToast';
import toastStory from './Toast.stories';

const argTypes = { ...toastStory.argTypes };
delete argTypes.level;
delete argTypes.themeId;

export default {
  ...toastStory,
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
    ...argTypes,
  },
  parameters: {
    ...toastStory.parameters,
    docs: {
      ...toastStory.parameters?.docs,
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
  permanent: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StyledToast.test.js', 'Toast.test.js'],
};
*/

Default.argTypes = {
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
