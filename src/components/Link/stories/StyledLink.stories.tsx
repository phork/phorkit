import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledLink } from '../StyledLink';
import linkStory from './Link.stories';

const argTypes = { ...linkStory.argTypes };
delete argTypes.contrast;
delete argTypes.themeId;

export default {
  ...linkStory,
  title: 'Navigation/Link/StyledLink',
  component: StyledLink,
  argTypes: {
    activeColor: {
      table: {
        category: 'Styled',
      },
    },
    hoveredColor: {
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
    ...linkStory.parameters,
    docs: {
      ...linkStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Link" title="StyledLink" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledLink>;

const Template: ComponentStory<typeof StyledLink> = args => <StyledLink {...args} />;

const defaultArgs = {
  activeColor: '#f18100',
  children: 'I am a link.',
  hoveredColor: '#ff8e0d',
  href: 'https://phorkit.org',
  target: '_blank',
  textColor: '#ff9b28',
  underline: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StyledLink.test.js', 'Link.test.js'],
};
*/

Default.argTypes = {
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
