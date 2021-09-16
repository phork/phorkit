import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledPaper, StyledPaperProps } from '../StyledPaper';
import paperStory from './Paper.stories';

export default {
  ...paperStory,
  title: 'Surfaces/Paper/StyledPaper',
  component: StyledPaper,
  argTypes: {
    backgroundColor: {
      table: {
        category: 'Styled controls',
      },
    },
    borderColor: {
      table: {
        category: 'Styled controls',
      },
    },
    textColor: {
      table: {
        category: 'Styled controls',
      },
    },
    scrollbarColor: {
      table: {
        category: 'Styled controls',
      },
    },
    ...paperStory.argTypes,
    children: {
      table: {
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
  scrollable: true,
  scrollbarColor: '#ccc',
  style: { height: '40px' },
  textColor: '#fff',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

Default.argTypes = {
  color: { table: { disable: true } },
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
