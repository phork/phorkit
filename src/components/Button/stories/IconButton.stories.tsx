import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { IconScale } from '../../../types';
import { SpinnerIcon } from '../../../icons/SpinnerIcon';
import { BlobbrIcon } from '../../../icons/internal/BlobbrIcon';
import { IconButtonProps, IconButton } from '../IconButton';
import buttonStory from './Button.stories';
import IconButtonDocumentation from './IconButton.docs.mdx';

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
      page: IconButtonDocumentation,
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

export const PrimaryColor = Template.bind({});
PrimaryColor.storyName = 'Color: Primary';
PrimaryColor.args = {
  ...defaultArgs,
  color: 'primary',
};

export const SuccessColor = Template.bind({});
SuccessColor.storyName = 'Color: Success';
SuccessColor.args = {
  ...defaultArgs,
  color: 'success',
};

export const WarningColor = Template.bind({});
WarningColor.storyName = 'Color: Warning';
WarningColor.args = {
  ...defaultArgs,
  color: 'warning',
};

export const DangerColor = Template.bind({});
DangerColor.storyName = 'Color: Danger';
DangerColor.args = {
  ...defaultArgs,
  color: 'danger',
};

export const NeutralColor = Template.bind({});
NeutralColor.storyName = 'Color: Neutral';
NeutralColor.args = {
  ...defaultArgs,
  color: 'neutral',
};

export const BlackColor = Template.bind({});
BlackColor.storyName = 'Color: Black';
BlackColor.args = {
  ...defaultArgs,
  color: 'black',
};

export const WhiteColor = Template.bind({});
WhiteColor.storyName = 'Color: White';
WhiteColor.args = {
  ...defaultArgs,
  color: 'white',
};

export const SolidWeight = Template.bind({});
SolidWeight.storyName = 'Weight: Solid';
SolidWeight.args = {
  ...defaultArgs,
  weight: 'solid',
};

export const ShadedWeight = Template.bind({});
ShadedWeight.storyName = 'Weight: Shaded';
ShadedWeight.args = {
  ...defaultArgs,
  weight: 'shaded',
};

export const OutlinedWeight = Template.bind({});
OutlinedWeight.storyName = 'Weight: Outlined';
OutlinedWeight.args = {
  ...defaultArgs,
  weight: 'outlined',
};

export const GhostWeight = Template.bind({});
GhostWeight.storyName = 'Weight: Ghost';
GhostWeight.args = {
  ...defaultArgs,
  weight: 'ghost',
};

export const InlineWeight = Template.bind({});
InlineWeight.storyName = 'Weight: Inline';
InlineWeight.args = {
  ...defaultArgs,
  iconScale: 'xlarge' as IconScale,
  weight: 'inline',
};

export const CircleShape = Template.bind({});
CircleShape.storyName = 'Shape: Circle';
CircleShape.args = {
  ...defaultArgs,
  shape: 'circle',
};

export const SquareShape = Template.bind({});
SquareShape.storyName = 'Shape: Square';
SquareShape.args = {
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
