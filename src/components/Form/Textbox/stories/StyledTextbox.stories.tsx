import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledTextbox, StyledTextboxProps } from '../StyledTextbox';
import textboxStory from './Textbox.stories';

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
    ...textboxStory.argTypes,
  },
  parameters: {
    ...textboxStory.parameters,
    docs: {
      ...textboxStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Form/Textbox" title="StyledTextbox" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
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
  contrast: false,
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

Default.argTypes = {
  contrast: { table: { disable: true } },
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
