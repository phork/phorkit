import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledLineLoader, StyledLineLoaderProps } from '../StyledLineLoader';
import lineLoaderStory from './LineLoader.stories';

const argTypes = { ...lineLoaderStory.argTypes };
delete argTypes.contrast;
delete argTypes.themeId;

export default {
  ...lineLoaderStory,
  title: 'Feedback/LineLoader/StyledLineLoader',
  component: StyledLineLoader,
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
    ...lineLoaderStory.parameters,
    docs: {
      ...lineLoaderStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/LineLoader" title="StyledLineLoader" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledLineLoader>;

const Template: ComponentStory<typeof StyledLineLoader> = args => <StyledLineLoader {...args} />;

const defaultArgs = {
  color: '#556270',
  fixed: false,
  percent: isChromatic() ? 24 : undefined,
  position: 'top' as StyledLineLoaderProps['position'],
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
