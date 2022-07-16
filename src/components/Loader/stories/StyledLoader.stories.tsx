import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledLoader } from '../StyledLoader';
import loaderStory from './Loader.stories';

const argTypes = { ...loaderStory.argTypes };
delete argTypes.contrast;
delete argTypes.themeId;

export default {
  ...loaderStory,
  title: 'Feedback/Loader/StyledLoader',
  component: StyledLoader,
  argTypes: {
    color: {
      control: {
        type: 'color',
      },
      table: {
        category: 'Styled',
      },
    },
    ...argTypes,
  },
  parameters: {
    ...loaderStory.parameters,
    docs: {
      ...loaderStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Loader" title="StyledLoader" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledLoader>;

const Template: ComponentStory<typeof StyledLoader> = args => <StyledLoader {...args} />;

const defaultArgs = {
  color: '#556270',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StyledLineLoader.test.js', 'LineLoader.test.js'],
};
*/

Default.argTypes = {
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
