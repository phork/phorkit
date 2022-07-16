import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { themes } from 'config/themes';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledShade } from '../StyledShade';
import shadeStory from './Shade.stories';

const argTypes = { ...shadeStory.argTypes };
delete argTypes.color;
delete argTypes.themeId;

export default {
  ...shadeStory,
  title: 'Surfaces/Shade/StyledShade',
  component: StyledShade,
  argTypes: {
    activePrimaryColor: {
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
    opaquePrimaryColor: {
      table: {
        category: 'Styled',
      },
    },
    ...argTypes,
  },
  parameters: {
    ...shadeStory.parameters,
    docs: {
      ...shadeStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Shade" title="StyledShade" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledShade>;

const Template: ComponentStory<typeof StyledShade> = args => <StyledShade {...args} />;

const defaultArgs = {
  actionable: false,
  active: false,
  activePrimaryColor: themes.light['color-P50-D10'],
  children: 'Hello world',
  focused: false,
  hovered: false,
  inverseColor: themes.light['color-P50-contrast'],
  opaque: false,
  opaquePrimaryColor: themes.light['color-P50-shade'],
  primaryColor: themes.light['color-P50'],
  style: { padding: '24px' },
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StyledShade.test.js', 'Shade.test.js'],
};
*/

Default.argTypes = {
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
