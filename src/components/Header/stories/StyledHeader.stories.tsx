import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledHeader } from '../StyledHeader';
import headerStory from './Header.stories';

const argTypes = { ...headerStory.argTypes };
delete argTypes.contrast;
delete argTypes.themeId;

export default {
  ...headerStory,
  title: 'Surfaces/Header/StyledHeader',
  component: StyledHeader,
  argTypes: {
    headerColor: {
      table: {
        category: 'Styled',
      },
    },
    ...argTypes,
  },
  parameters: {
    ...headerStory.parameters,
    docs: {
      ...headerStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Header" title="StyledHeader" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledHeader>;

const Template: ComponentStory<typeof StyledHeader> = ({ children, ...args }) => (
  <StyledHeader {...args}>
    {children || (
      <React.Fragment>
        <div>Hello world</div>
        <div>Hello world</div>
      </React.Fragment>
    )}
  </StyledHeader>
);

const defaultArgs = {
  backgroundColor: '#556270',
  bordered: true,
  borderColor: '#393a61',
  textColor: '#fff',
  height: 50,
  variant: undefined,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StyledHeader.test.js', 'Header.test.js'],
};
*/

Default.argTypes = {
  contrast: { table: { disable: true } },
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
  variant: { table: { disable: true } },
};
