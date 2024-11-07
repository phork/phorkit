import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { themes } from 'config/themes';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledToggle } from '../StyledToggle';
import ToggleStory from './Toggle.stories';

const argTypes = { ...ToggleStory.argTypes };
delete argTypes.themeId;

export default {
  ...ToggleStory,
  title: 'Form/Toggle/StyledToggle',
  component: StyledToggle,
  argTypes: {
    toggleWidth: {
      table: {
        category: 'Size',
      },
    },
    toggleHeight: {
      table: {
        category: 'Size',
      },
    },
    toggleBorderRadius: {
      table: {
        category: 'Size',
      },
    },
    toggleBorderWidth: {
      table: {
        category: 'Size',
      },
    },
    toggleButtonBorderRadius: {
      table: {
        category: 'Size',
      },
    },
    toggleFocusRingSize: {
      table: {
        category: 'Size',
      },
    },
    toggleLabelTopMargin: {
      table: {
        category: 'Size',
      },
    },

    backgroundColor: {
      table: {
        category: 'Styled',
      },
    },
    buttonBackgroundColor: {
      table: {
        category: 'Styled',
      },
    },
    checkedBackgroundColor: {
      table: {
        category: 'Styled',
      },
    },
    checkedButtonBackgroundColor: {
      table: {
        category: 'Styled',
      },
    },
    checkedHoveredFocusRingColor: {
      table: {
        category: 'Styled',
      },
    },
    hoveredFocusRingColor: {
      table: {
        category: 'Styled',
      },
    },
    checkedHoveredFocusRingOpacity: {
      table: {
        category: 'Styled',
      },
    },
    ...argTypes,
  },
  parameters: {
    ...ToggleStory.parameters,
    docs: {
      ...ToggleStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Toggle" title="StyledToggle" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledToggle>;

const Template: ComponentStory<typeof StyledToggle> = args => <StyledToggle {...args} />;

const defaultArgs = {
  'aria-label': 'Super fantastic toggle',
  checked: true,
  children: 'Super fantastic label',
  contrast: false,
  disabled: false,
  full: false,
  persistEvents: false,
  reverse: false,

  backgroundColor: themes.light['color-FG0-O20'],
  buttonBackgroundColor: themes.light['color-BG05'],
  hoveredFocusRingColor: themes.light['color-FG0-O40'],
  checkedBackgroundColor: themes.light['color-P60'],
  checkedButtonBackgroundColor: themes.light['color-BG05'],
  checkedHoveredFocusRingColor: themes.light['color-P60'],
  checkedHoveredFocusRingOpacity: undefined,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StyledToggle.test.js', 'Toggle.test.js'],
};
*/

Default.argTypes = {
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
