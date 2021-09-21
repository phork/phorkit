import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledPassword, StyledPasswordProps } from '../StyledPassword';
import passwordStory from './Password.stories';

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
    ...passwordStory.argTypes,
  },
  parameters: {
    ...passwordStory.parameters,
    docs: {
      ...passwordStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Form/Textbox" title="StyledPassword" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledPassword>;

const Template: ComponentStory<typeof StyledPassword> = args => <StyledPassword {...args} />;

const defaultArgs = {
  alwaysTriggerBlur: false,
  alwaysTriggerFocus: false,
  autoFocus: false,
  contrast: false,
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

Default.argTypes = {
  contrast: { table: { disable: true } },
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
