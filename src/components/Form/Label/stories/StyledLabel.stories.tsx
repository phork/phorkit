import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledLabel } from '../StyledLabel';
import labelStory from './Label.stories';

const argTypes = { ...labelStory.argTypes };
delete argTypes.contrast;
delete argTypes.themeId;

export default {
  ...labelStory,
  title: 'Form/Label/StyledLabel',
  component: StyledLabel,
  argTypes: {
    fontSize: {
      table: {
        category: 'Styled',
      },
    },
    lineHeight: {
      table: {
        category: 'Styled',
      },
    },
    mutedColor: {
      table: {
        category: 'Styled',
      },
    },
    textColor: {
      table: {
        category: 'Styled',
      },
    },
    ...argTypes,
  },
  parameters: {
    ...labelStory.parameters,
    docs: {
      ...labelStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Form/Label" title="StyledLabel" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledLabel>;

const Template: ComponentStory<typeof StyledLabel> = args => <StyledLabel {...args} />;

const defaultArgs = {
  children: 'Super fantastic label',
  disabled: false,
  focused: false,
  lineHeight: 1,
  fontSize: 20,
  muted: true,
  mutedTextColor: '#81BCFF',
  noWrap: false,
  textColor: '#0060ce',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StyledLabel.test.js', 'Label.test.js'],
};
*/

Default.argTypes = {
  strength: { table: { disable: true } },
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
