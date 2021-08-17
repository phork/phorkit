import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { StyledCard } from '../StyledCard';
import cardStory from './Card.stories';

export default {
  ...cardStory,
  title: 'Surfaces/Card/StyledCard',
  component: StyledCard,
  argTypes: {
    borderColor: {
      table: {
        category: 'Styled controls',
      },
    },
    hoveredBorderColor: {
      table: {
        category: 'Styled controls',
      },
    },
    ...cardStory.argTypes,
  },
} as ComponentMeta<typeof StyledCard>;

const Template: ComponentStory<typeof StyledCard> = args => <StyledCard {...args} />;

const defaultArgs = {
  borderColor: '#c5106b',
  bordered: true,
  children: (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 200, height: 200 }}>
      Hello world
    </div>
  ),
  full: false,
  hoveredBorderColor: '#642da0',
  hoverable: true,
  magnify: false,
  raised: false,
  squared: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

Default.argTypes = {
  raised: { table: { disable: true } },
  style: { table: { disable: true } },
  theme: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
