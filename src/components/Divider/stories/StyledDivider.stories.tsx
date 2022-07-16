import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledDivider, StyledDividerProps } from '../StyledDivider';
import dividerStory from './Divider.stories';

const argTypes = { ...dividerStory.argTypes };
delete argTypes.contrast;
delete argTypes.themeId;
delete argTypes.variant;

export default {
  ...dividerStory,
  title: 'Utilities/Divider/StyledDivider',
  component: StyledDivider,
  argTypes: {
    dividerColor: {
      table: {
        category: 'Styled',
      },
    },
    ...argTypes,
  },
  parameters: {
    ...dividerStory.parameters,
    docs: {
      ...dividerStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Divider" title="StyledDivider" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledDivider>;

const Template: ComponentStory<typeof StyledDivider> = args => <StyledDivider {...args} />;

const defaultArgs = {
  dividerColor: '#393945',
  orientation: 'horizontal' as StyledDividerProps['orientation'],
  variant: undefined,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StyledDivider.test.js', 'Divider.test.js'],
};
*/

Default.argTypes = {
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
