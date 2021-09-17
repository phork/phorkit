import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledProgress, StyledProgressProps } from '../StyledProgress';
import dividerStory from './Progress.stories';

export default {
  ...dividerStory,
  title: 'Feedback/Progress/StyledProgress',
  component: StyledProgress,
  argTypes: {
    backgroundColor: {
      table: {
        category: 'Styled controls',
      },
    },
    segmentAnimationColor: {
      table: {
        category: 'Styled controls',
      },
    },
    segmentColor: {
      table: {
        category: 'Styled controls',
      },
    },
    ...dividerStory.argTypes,
  },
  parameters: {
    ...dividerStory.parameters,
    docs: {
      ...dividerStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Progress" title="StyledProgress" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledProgress>;

const Template: ComponentStory<typeof StyledProgress> = args => <StyledProgress {...args} />;

const defaultArgs = {
  backgroundColor: 'rgba(0, 0, 0, .1)',
  orientation: 'horizontal' as StyledProgressProps['orientation'],
  percent: 60,
  segmentAnimationColor: 'rgba(0, 0, 0, .1)',
  segmentColor: 'linear-gradient(90deg, rgba(244,17,80,1) 0%, rgba(255,50,50,1) 25%, rgba(248,190,7,1) 100%)',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

Default.argTypes = {
  contrast: { table: { disable: true } },
  color: { table: { disable: true } },
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
