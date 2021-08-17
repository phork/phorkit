import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { StyledDivider, StyledDividerProps } from '../StyledDivider';
import dividerStory from './Divider.stories';

export default {
  ...dividerStory,
  title: 'Utilities/Divider/StyledDivider',
  component: StyledDivider,
  argTypes: {
    dividerColor: {
      table: {
        category: 'Styled controls',
      },
    },
    ...dividerStory.argTypes,
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

Default.argTypes = {
  contrast: { table: { disable: true } },
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
  variant: { table: { disable: true } },
};
