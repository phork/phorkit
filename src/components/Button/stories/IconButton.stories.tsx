import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { IconScale } from '../../../types';
import { SpinnerIcon } from '../../../icons/SpinnerIcon';
import { BlobbrIcon } from '../../../icons/internal/BlobbrIcon';
import { IconButtonProps, IconButton } from '../IconButton';
import buttonStory from './Button.stories';

export default {
  ...buttonStory,
  title: 'Buttons/IconButton',
  component: IconButton,
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
  parameters: {
    ...buttonStory.parameters,
    docs: {
      ...buttonStory.parameters?.docs,
      description: {
        component: 'A simple icon button or a link that looks like a button.',
      },
    },
  },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<
  (args: IconButtonProps & { iconScale?: IconScale }) => ReturnType<typeof IconButton>
> = ({ children, iconScale, size, ...args }) => (
  <IconButton<'button'>
    {...args}
    as="button"
    loader={<SpinnerIcon scale={iconScale} />}
    onClick={action('clicked')}
    size={size}
  >
    <BlobbrIcon scale={iconScale} />
  </IconButton>
);

const defaultArgs = {
  active: false,
  align: 'center' as IconButtonProps['align'],
  as: 'button' as IconButtonProps['as'],
  color: 'primary' as IconButtonProps['color'],
  disabled: false,
  focused: false,
  fullWidth: false,
  iconScale: 'medium' as IconScale,
  loading: false,
  noHeight: false,
  noPadding: false,
  shape: 'circle' as IconButtonProps['shape'],
  size: 'medium' as IconButtonProps['size'],
  type: 'button' as IconButtonProps['type'],
  unstyled: false,
  unthemed: false,
  weight: 'solid' as IconButtonProps['weight'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Solid = Template.bind({});
Solid.storyName = 'Weight: Solid';
Solid.args = {
  ...defaultArgs,
  weight: 'solid',
};

export const Shaded = Template.bind({});
Shaded.storyName = 'Weight: Shaded';
Shaded.args = {
  ...defaultArgs,
  weight: 'shaded',
};

export const Outlined = Template.bind({});
Outlined.storyName = 'Weight: Outlined';
Outlined.args = {
  ...defaultArgs,
  weight: 'outlined',
};

export const Ghost = Template.bind({});
Ghost.storyName = 'Weight: Ghost';
Ghost.args = {
  ...defaultArgs,
  weight: 'ghost',
};

export const Square = Template.bind({});
Square.storyName = 'Shape: Square';
Square.args = {
  ...defaultArgs,
  shape: 'square',
};

export const Loading = Template.bind({});
Loading.args = {
  ...defaultArgs,
  loading: true,
};

export const Link = ({ iconScale, ...args }: IconButtonProps<'a'> & { iconScale?: IconScale }) => (
  <IconButton<'a'> {...args}>
    <BlobbrIcon scale={iconScale} />
  </IconButton>
);
Link.args = {
  ...defaultArgs,
  as: 'a',
  href: 'https://phorkit.phork.org',
  target: '_blank',
};

Link.argTypes = {
  loading: { table: { disable: true } },
  href: { table: { disable: false } },
  target: { table: { disable: false } },
};
