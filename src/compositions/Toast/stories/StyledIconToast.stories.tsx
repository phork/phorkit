import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { CheckIcon } from 'icons/internal/CheckIcon';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledIconToast } from '../StyledIconToast';
import toastStory from './Toast.stories';

const argTypes = { ...toastStory.argTypes };
delete argTypes.level;
delete argTypes.themeId;

export default {
  ...toastStory,
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
    ...argTypes,
  },
  parameters: {
    ...toastStory.parameters,
    docs: {
      ...toastStory.parameters?.docs,
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
  permanent: false,
  title: 'Hello world',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StyledIconToast.test.js', 'IconToast.test.js'],
};
*/

Default.argTypes = {
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
