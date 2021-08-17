import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { IconScale } from '../../../types';
import { ThemeColorIds } from '../../../config/themes';
import { SpinnerIcon } from '../../../icons/SpinnerIcon';
import { BlobbrIcon } from '../../../icons/internal/BlobbrIcon';
import { ColoredIconTextButton, ColoredIconTextButtonProps } from '../ColoredIconTextButton';
import buttonStory from './ColoredButton.stories';

export default {
  ...buttonStory,
  title: 'Buttons/IconTextButton/ColoredIconTextButton',
  component: ColoredIconTextButton,
} as ComponentMeta<typeof ColoredIconTextButton>;

const Template: ComponentStory<(args: ColoredIconTextButtonProps) => ReturnType<typeof ColoredIconTextButton>> = ({
  children,
  size,
  ...args
}) => (
  <ColoredIconTextButton<'button'>
    {...args}
    as="button"
    icon={<BlobbrIcon scale={size as IconScale} />}
    loader={<SpinnerIcon scale={size as IconScale} />}
    onClick={action('clicked')}
    size={size}
  >
    {children}
  </ColoredIconTextButton>
);

const defaultArgs = {
  active: false,
  align: 'center' as ColoredIconTextButtonProps['align'],
  as: 'button' as ColoredIconTextButtonProps['as'],
  children: 'Click me',
  color: undefined,
  colorId: 'P60' as ThemeColorIds,
  disabled: false,
  focused: false,
  fullWidth: false,
  loading: false,
  noHeight: false,
  noPadding: false,
  shape: 'pill' as ColoredIconTextButtonProps['shape'],
  size: 'medium' as ColoredIconTextButtonProps['size'],
  type: 'button' as ColoredIconTextButtonProps['type'],
  unstyled: false,
  unthemed: false,
  weight: 'solid' as ColoredIconTextButtonProps['weight'],
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
