import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { IconScale } from '../../../types';
import { SpinnerIcon } from '../../../icons/SpinnerIcon';
import { BlobbrIcon } from '../../../icons/internal/BlobbrIcon';
import { StyledIconTextButton, StyledIconTextButtonProps } from '../StyledIconTextButton';
import buttonStory from './StyledButton.stories';

export default {
  ...buttonStory,
  title: 'Buttons/IconTextButton/StyledIconTextButton',
  component: StyledIconTextButton,
} as ComponentMeta<typeof StyledIconTextButton>;

const Template: ComponentStory<(args: StyledIconTextButtonProps) => ReturnType<typeof StyledIconTextButton>> = ({
  children,
  size,
  ...args
}) => (
  <StyledIconTextButton
    {...args}
    icon={<BlobbrIcon scale={size as IconScale} />}
    loader={<SpinnerIcon scale={size as IconScale} />}
    onClick={action('clicked')}
    size={size}
  >
    {children}
  </StyledIconTextButton>
);

const defaultArgs = {
  active: false,
  activePrimaryColor: '#798796',
  align: 'center' as StyledIconTextButtonProps['align'],
  as: 'button' as StyledIconTextButtonProps['as'],
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
  shape: 'pill' as StyledIconTextButtonProps['shape'],
  size: 'medium' as StyledIconTextButtonProps['size'],
  type: 'button' as StyledIconTextButtonProps['type'],
  unstyled: false,
  unthemed: false,
  weight: 'solid' as StyledIconTextButtonProps['weight'],
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
