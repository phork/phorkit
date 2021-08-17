import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { StyledButton, StyledButtonProps } from '../StyledButton';
import buttonStory from './Button.stories';

export default {
  ...buttonStory,
  title: 'Controls/Button/StyledButton',
  component: StyledButton,
  argTypes: {
    activePrimaryColor: {
      table: {
        category: 'Styled controls',
      },
    },
    hoveredPrimaryColor: {
      table: {
        category: 'Styled controls',
      },
    },
    inverseColor: {
      table: {
        category: 'Styled controls',
      },
    },
    primaryColor: {
      table: {
        category: 'Styled controls',
      },
    },
    width: {
      table: {
        category: 'Styled controls',
      },
    },
    ...buttonStory.argTypes,
  },
} as ComponentMeta<typeof StyledButton>;

const Template: ComponentStory<typeof StyledButton> = args => <StyledButton {...args} />;

const defaultArgs = {
  active: false,
  activePrimaryColor: '#798796',
  align: 'center' as StyledButtonProps['align'],
  as: 'button' as StyledButtonProps['as'],
  children: 'Click me',
  color: undefined,
  disabled: false,
  focused: false,
  fullWidth: false,
  hoveredPrimaryColor: '#454f58',
  inverseColor: '#fff',
  loading: false,
  noHeight: false,
  noPadding: false,
  primaryColor: '#556270',
  shape: 'pill' as StyledButtonProps['shape'],
  size: 'medium' as StyledButtonProps['size'],
  type: 'button' as StyledButtonProps['type'],
  unstyled: false,
  unthemed: false,
  weight: 'solid' as StyledButtonProps['weight'],
  width: 120,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

Default.argTypes = {
  color: { table: { disable: true } },
  contrast: { table: { disable: true } },
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
  unstyled: { table: { disable: true } },
};
