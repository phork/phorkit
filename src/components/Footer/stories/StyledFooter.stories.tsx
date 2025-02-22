import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledFooter } from '../StyledFooter';
import footerStory from './Footer.stories';

const argTypes = { ...footerStory.argTypes };
delete argTypes.contrast;
delete argTypes.themeId;

export default {
  ...footerStory,
  title: 'Surfaces/Footer/StyledFooter',
  component: StyledFooter,
  argTypes: {
    height: {
      table: {
        category: 'Appearance',
      },
    },

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
    focusedOutlineColor: {
      table: {
        category: 'Styled',
      },
    },
    scrollbarColor: {
      table: {
        category: 'Styled',
      },
    },
    textColor: {
      table: {
        category: 'Styled',
      },
    },
    themed: {
      table: {
        category: 'Styled',
      },
    },

    themeId: {
      table: {
        category: 'Uncommon',
      },
    },
    ...argTypes,
  },
  parameters: {
    ...footerStory.parameters,
    docs: {
      ...footerStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Footer" title="StyledFooter" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledFooter>;

const Template: ComponentStory<typeof StyledFooter> = ({ children, ...args }) => (
  <StyledFooter {...args}>
    {children || (
      <React.Fragment>
        <div>Hello world</div>
        <div>Hello world</div>
      </React.Fragment>
    )}
  </StyledFooter>
);

const defaultArgs = {
  backgroundColor: '#556270',
  bordered: true,
  borderColor: '#393a61',
  textColor: '#fff',
  height: 50,
  themed: false,
  variant: undefined,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Themed = Template.bind({});
Themed.storyName = 'Inherit theme';
Themed.args = {
  bordered: true,
  height: 50,
  variant: 'primary',
  themed: true,
};

/*
Default.parameters = {
  jest: ['StyledFooter.test.js', 'Footer.test.js'],
};
*/

Default.argTypes = {
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
  variant: { table: { disable: true } },
};
