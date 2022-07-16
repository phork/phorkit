import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { StyledTextbox, StyledTextboxProps } from '../StyledTextbox';
import StyledTextboxDocumentation from './StyledTextbox.docs.mdx';
import textboxStory from './Textbox.stories';

const argTypes = { ...textboxStory.argTypes };
delete argTypes.contrast;
delete argTypes.themeId;
delete argTypes.validity;

export default {
  ...textboxStory,
  title: 'Form/Textbox/StyledTextbox',
  component: StyledTextbox,
  argTypes: {
    textboxIconColor: {
      table: {
        category: 'Style',
      },
    },
    textboxIconHoveredColor: {
      table: {
        category: 'Style',
      },
    },
    textboxInputContainerBackgroundColor: {
      table: {
        category: 'Style',
      },
    },
    textboxInputContainerBorderColor: {
      table: {
        category: 'Style',
      },
    },
    textboxInputContainerFocusedBorderColor: {
      table: {
        category: 'Style',
      },
    },
    textboxInputContainerHoveredBorderColor: {
      table: {
        category: 'Style',
      },
    },
    textboxInputTextColor: {
      table: {
        category: 'Style',
      },
    },
    textboxLabelTextColor: {
      table: {
        category: 'Style',
      },
    },
    ...argTypes,
  },
  parameters: {
    ...textboxStory.parameters,
    docs: {
      ...textboxStory.parameters?.docs,
      page: StyledTextboxDocumentation,
    },
  },
} as ComponentMeta<typeof StyledTextbox>;

const Template: ComponentStory<typeof StyledTextbox> = args => <StyledTextbox {...args} />;

const defaultArgs = {
  alwaysShowFormatting: false,
  alwaysTriggerBlur: false,
  alwaysTriggerFocus: false,
  alwaysUseFormatting: false,
  autoFocus: false,
  centered: false,
  clearable: false,
  disabled: false,
  iconAfterActionable: false,
  iconBeforeActionable: false,
  label: 'Super fantastic label',
  persistEvents: false,
  readOnly: false,
  required: false,
  size: 'large' as StyledTextboxProps['size'],
  textboxIconColor: '#9D69D5',
  textboxIconHoveredColor: '#642da0',
  textboxInputContainerBackgroundColor: 'transparent',
  textboxInputContainerBorderColor: '#9D69D5',
  textboxInputContainerFocusedBorderColor: '#57278C',
  textboxInputContainerHoveredBorderColor: '#642da0',
  textboxInputTextColor: '#642da0',
  textboxLabelTextColor: '#B995E1',
  transitional: false,
  transparent: false,
  type: 'text' as StyledTextboxProps['type'],
  value: 'Hello world',
  variant: 'filled' as StyledTextboxProps['variant'],
  visuallyFocused: false,
  width: '100%',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StyledTextbox.test.js', 'Textbox.test.js'],
};
*/

Default.argTypes = {
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
