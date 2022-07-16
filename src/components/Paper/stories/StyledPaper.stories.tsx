import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledPaper, StyledPaperProps } from '../StyledPaper';
import paperStory from './Paper.stories';

const argTypes = { ...paperStory.argTypes };
delete argTypes.color;
delete argTypes.themeId;

export default {
  ...paperStory,
  title: 'Surfaces/Paper/StyledPaper',
  component: StyledPaper,
  argTypes: {
    backgroundColor: {
      table: {
        category: 'Styled',
      },
    },
    borderColor: {
      table: {
        category: 'Styled',
      },
    },
    textColor: {
      table: {
        category: 'Styled',
      },
    },
    scrollbarColor: {
      table: {
        category: 'Styled',
      },
    },
    ...argTypes,
    children: {
      control: {
        disable: true,
      },
    },
  },
  parameters: {
    ...paperStory.parameters,
    docs: {
      ...paperStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Paper" title="StyledPaper" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledPaper>;

const Template: ComponentStory<typeof StyledPaper> = args => <StyledPaper {...args} />;

const defaultArgs = {
  backgroundColor: '#556270',
  borderColor: '#000',
  bordered: true,
  children: <div style={{ height: '60px' }}>The quick brown fox jumped over the lazy dog</div>,
  container: 'panel' as StyledPaperProps['container'],
  focusedOutlineColor: '#f41150',
  scrollable: true,
  scrollbar: 'medium' as StyledPaperProps['scrollbar'],
  scrollbarColor: '#ccc',
  style: { height: '40px' },
  textColor: '#fff',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StyledPaper.test.js', 'Paper.test.js'],
};
*/

Default.argTypes = {
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
