import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledBadge, StyledBadgeProps } from '../StyledBadge';
import badgeStory from './Badge.stories';

export default {
  ...badgeStory,
  title: 'Display/Badge/StyledBadge',
  component: StyledBadge,
  argTypes: {
    backgroundColor: {
      table: {
        category: 'Styled',
      },
    },
    textColor: {
      table: {
        category: 'Styled',
      },
    },
    ...badgeStory.argTypes,
  },
  parameters: {
    ...badgeStory.parameters,
    docs: {
      ...badgeStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Badge" title="StyledBadge" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledBadge>;

const Template: ComponentStory<typeof StyledBadge> = args => <StyledBadge {...args} />;

const defaultArgs = {
  backgroundColor: '#556270',
  children: 99,
  color: undefined,
  position: 'top-right' as StyledBadgeProps['position'],
  shape: 'count' as StyledBadgeProps['shape'],
  textColor: '#fff',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

Default.argTypes = {
  color: { table: { disable: true } },
  contrast: { table: { disable: true } },
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
