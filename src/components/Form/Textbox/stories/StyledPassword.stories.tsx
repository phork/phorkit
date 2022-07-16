import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { StyledPassword, StyledPasswordProps } from '../StyledPassword';
import passwordStory from './Password.stories';
import StyledPasswordDocumentation from './StyledPassword.docs.mdx';

const argTypes = { ...passwordStory.argTypes };
delete argTypes.contrast;
delete argTypes.themeId;
delete argTypes.validity;

export default {
  ...passwordStory,
  title: 'Form/Password/StyledPassword',
  component: StyledPassword,
  argTypes: {
    passwordIconColor: {
      table: {
        category: 'Style',
      },
    },
    passwordIconHoveredColor: {
      table: {
        category: 'Style',
      },
    },
    passwordInputContainerBackgroundColor: {
      table: {
        category: 'Style',
      },
    },
    passwordInputContainerBorderColor: {
      table: {
        category: 'Style',
      },
    },
    passwordInputContainerFocusedBorderColor: {
      table: {
        category: 'Style',
      },
    },
    passwordInputContainerHoveredBorderColor: {
      table: {
        category: 'Style',
      },
    },
    passwordInputTextColor: {
      table: {
        category: 'Style',
      },
    },
    passwordLabelTextColor: {
      table: {
        category: 'Style',
      },
    },
    ...argTypes,
  },
  parameters: {
    ...passwordStory.parameters,
    docs: {
      ...passwordStory.parameters?.docs,
      page: StyledPasswordDocumentation,
    },
  },
} as ComponentMeta<typeof StyledPassword>;

const Template: ComponentStory<typeof StyledPassword> = args => <StyledPassword {...args} />;

const defaultArgs = {
  alwaysTriggerBlur: false,
  alwaysTriggerFocus: false,
  autoFocus: false,
  disabled: false,
  iconBeforeActionable: false,
  initialType: 'password' as StyledPasswordProps['initialType'],
  label: 'Super fantastic label',
  passwordIconColor: '#9D69D5',
  passwordIconHoveredColor: '#642da0',
  passwordInputContainerBackgroundColor: 'transparent',
  passwordInputContainerBorderColor: '#9D69D5',
  passwordInputContainerFocusedBorderColor: '#57278C',
  passwordInputContainerHoveredBorderColor: '#642da0',
  passwordInputTextColor: '#642da0',
  passwordLabelTextColor: '#B995E1',
  persistEvents: false,
  readOnly: false,
  required: false,
  size: 'large' as StyledPasswordProps['size'],
  transitional: false,
  transparent: false,
  value: 'Hello world',
  variant: 'filled' as StyledPasswordProps['variant'],
  visuallyFocused: false,
  width: '100%',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StyledPassword.test.js', 'Password.test.js'],
};
*/

Default.argTypes = {
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
