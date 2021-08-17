import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { IconScale } from '../../../types';
import { ThemeColorIds } from '../../../config/themes';
import { SpinnerIcon } from '../../../icons/SpinnerIcon';
import { BlobbrIcon } from '../../../icons/internal/BlobbrIcon';
import { ColoredIconButton, ColoredIconButtonProps } from '../ColoredIconButton';
import buttonStory from './ColoredButton.stories';

export default {
  ...buttonStory,
  title: 'Buttons/IconButton/ColoredIconButton',
  component: ColoredIconButton,
  argTypes: {
    ...buttonStory.argTypes,
    shape: {
      ...buttonStory.argTypes?.shape,
      options: [undefined, 'circle', 'square'],
    },
    iconScale: {
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge', '2xlarge', '3xlarge'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof ColoredIconButton>;

const Template: ComponentStory<
  (args: ColoredIconButtonProps & { iconScale?: IconScale }) => ReturnType<typeof ColoredIconButton>
> = ({ children, iconScale, size, ...args }) => (
  <ColoredIconButton<'button'>
    {...args}
    as="button"
    loader={<SpinnerIcon scale={iconScale} />}
    onClick={action('clicked')}
    size={size}
  >
    <BlobbrIcon scale={iconScale} />
  </ColoredIconButton>
);

const defaultArgs = {
  active: false,
  align: 'center' as ColoredIconButtonProps['align'],
  as: 'button' as ColoredIconButtonProps['as'],
  color: undefined,
  colorId: 'P60' as ThemeColorIds,
  disabled: false,
  focused: false,
  fullWidth: false,
  iconScale: 'medium' as IconScale,
  loading: false,
  noHeight: false,
  noPadding: false,
  shape: 'circle' as ColoredIconButtonProps['shape'],
  size: 'medium' as ColoredIconButtonProps['size'],
  type: 'button' as ColoredIconButtonProps['type'],
  unstyled: false,
  unthemed: false,
  weight: 'solid' as ColoredIconButtonProps['weight'],
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
