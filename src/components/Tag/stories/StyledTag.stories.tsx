import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledTag, StyledTagProps } from '../StyledTag';
import tagStory from './Tag.stories';

const argTypes = { ...tagStory.argTypes };
delete argTypes.contrast;
delete argTypes.themeId;

export default {
  ...tagStory,
  title: 'Display/Tag/StyledTag',
  component: StyledTag,
  argTypes: {
    activePrimaryColor: {
      table: {
        category: 'Styled',
      },
    },
    hoveredPrimaryColor: {
      table: {
        category: 'Styled',
      },
    },
    inverseColor: {
      table: {
        category: 'Styled',
      },
    },
    primaryColor: {
      table: {
        category: 'Styled',
      },
    },
    ...argTypes,
  },
  parameters: {
    ...tagStory.parameters,
    docs: {
      ...tagStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Tag" title="StyledTag" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledTag>;

const Template: ComponentStory<typeof StyledTag> = args => <StyledTag {...args} />;

const defaultArgs = {
  actionable: true,
  active: false,
  activePrimaryColor: '#798796',
  children: 'Hello world',
  flush: false,
  focused: false,
  hovered: false,
  hoveredPrimaryColor: '#454f58',
  inverseColor: '#fff',
  primaryColor: '#556270',
  shape: 'pill' as StyledTagProps['shape'],
  size: 'small' as StyledTagProps['size'],
  weight: 'shaded' as StyledTagProps['weight'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StyledTag.test.js', 'Tag.test.js'],
};
*/

Default.argTypes = {
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
