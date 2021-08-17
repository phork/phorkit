import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { IconScale } from '../../../types';
import { SpinnerIcon } from '../../../icons/SpinnerIcon';
import { BlobbrIcon } from '../../../icons/internal/BlobbrIcon';
import { StyledIconButton, StyledIconButtonProps } from '../StyledIconButton';
import buttonStory from './StyledButton.stories';

export default {
  ...buttonStory,
  title: 'Buttons/IconButton/StyledIconButton',
  component: StyledIconButton,
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
} as ComponentMeta<typeof StyledIconButton>;

const Template: ComponentStory<
  (args: StyledIconButtonProps & { iconScale?: IconScale }) => ReturnType<typeof StyledIconButton>
> = ({ children, iconScale, size, ...args }) => (
  <StyledIconButton {...args} loader={<SpinnerIcon scale={iconScale} />} onClick={action('clicked')} size={size}>
    <BlobbrIcon scale={iconScale} />
  </StyledIconButton>
);

const defaultArgs = {
  active: false,
  activePrimaryColor: '#798796',
  align: 'center' as StyledIconButtonProps['align'],
  as: 'button' as StyledIconButtonProps['as'],
  color: undefined,
  disabled: false,
  focused: false,
  fullWidth: false,
  hoveredPrimaryColor: '#454f58',
  iconScale: 'medium' as IconScale,
  inverseColor: '#fff',
  loading: false,
  noHeight: false,
  noPadding: false,
  primaryColor: '#556270',
  shape: 'circle' as StyledIconButtonProps['shape'],
  size: 'medium' as StyledIconButtonProps['size'],
  type: 'button' as StyledIconButtonProps['type'],
  unstyled: false,
  unthemed: false,
  weight: 'solid' as StyledIconButtonProps['weight'],
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
