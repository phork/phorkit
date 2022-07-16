import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledTitledToast } from '../StyledTitledToast';
import toastStory from './Toast.stories';

const argTypes = { ...toastStory.argTypes };
delete argTypes.level;
delete argTypes.themeId;

export default {
  ...toastStory,
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
    ...argTypes,
  },
  parameters: {
    ...toastStory.parameters,
    docs: {
      ...toastStory.parameters?.docs,
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
  permanent: false,
  title: 'Hello world',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StyledTitledToast.test.js', 'TitledToast.test.js'],
};
*/

Default.argTypes = {
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
