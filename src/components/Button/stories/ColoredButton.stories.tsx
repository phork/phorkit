import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { ThemeColorIds } from '../../../config/themes';
import { getPrimaryColorIds } from '../../../stories/helpers/utils';
import { ColoredButton, ColoredButtonProps } from '../ColoredButton';
import buttonStory from './Button.stories';

export default {
  ...buttonStory,
  title: 'Controls/Button/ColoredButton',
  component: ColoredButton,
  argTypes: {
    colorId: {
      options: getPrimaryColorIds('light'),
      control: { type: 'select' },
      table: {
        category: 'Color controls',
      },
    },
    ...buttonStory.argTypes,
  },
} as ComponentMeta<typeof ColoredButton>;

const Template: ComponentStory<typeof ColoredButton> = args => <ColoredButton {...args} />;

const defaultArgs = {
  active: false,
  align: 'center' as ColoredButtonProps['align'],
  as: 'button' as ColoredButtonProps['as'],
  children: 'Click me',
  color: undefined,
  colorId: 'P60' as ThemeColorIds,
  disabled: false,
  focused: false,
  fullWidth: false,
  loading: false,
  noHeight: false,
  noPadding: false,
  shape: 'pill' as ColoredButtonProps['shape'],
  size: 'medium' as ColoredButtonProps['size'],
  type: 'button' as ColoredButtonProps['type'],
  unstyled: false,
  unthemed: false,
  weight: 'solid' as ColoredButtonProps['weight'],
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
