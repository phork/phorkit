import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledCard } from '../StyledCard';
import cardStory from './Card.stories';

const argTypes = { ...cardStory.argTypes };
delete argTypes.themeId;

export default {
  ...cardStory,
  title: 'Surfaces/Card/StyledCard',
  component: StyledCard,
  argTypes: {
    borderColor: {
      table: {
        category: 'Styled',
      },
    },
    hoveredBorderColor: {
      table: {
        category: 'Styled',
      },
    },
    ...argTypes,
  },
  parameters: {
    ...cardStory.parameters,
    docs: {
      ...cardStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Card" title="StyledCard" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledCard>;

const Template: ComponentStory<typeof StyledCard> = args => <StyledCard {...args} />;

const defaultArgs = {
  borderColor: '#c5106b',
  bordered: true,
  children: (
    <Typography<'div'>
      as="div"
      color="primary"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 200, height: 200 }}
    >
      Hello world
    </Typography>
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

/*
Default.parameters = {
  jest: ['StyledCard.test.js', 'Card.test.js'],
};
*/

Default.argTypes = {
  raised: { table: { disable: true } },
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
