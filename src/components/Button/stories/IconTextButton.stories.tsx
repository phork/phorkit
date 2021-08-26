import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { IconScale } from '../../../types';
import { SpinnerIcon } from '../../../icons/SpinnerIcon';
import { BlobbrIcon } from '../../../icons/internal/BlobbrIcon';
import { IconTextButtonProps, IconTextButton } from '../IconTextButton';
import buttonStory from './Button.stories';
import IconTextButtonDocumentation from './IconTextButton.docs.mdx';

export default {
  ...buttonStory,
  title: 'Buttons/IconTextButton',
  component: IconTextButton,
  argTypes: {
    reverse: {
      table: {
        category: 'Icon controls',
      },
    },
    icon: {
      control: {
        disable: true,
      },
      table: {
        category: 'Icon controls',
      },
    },
    ...buttonStory.argTypes,
  },
  parameters: {
    ...buttonStory.parameters,
    docs: {
      ...buttonStory.parameters?.docs,
      page: IconTextButtonDocumentation,
      description: {
        component: 'A button with text and an icon before or after the text.',
      },
    },
  },
} as ComponentMeta<typeof IconTextButton>;

const Template: ComponentStory<(args: IconTextButtonProps) => ReturnType<typeof IconTextButton>> = ({
  children,
  size,
  ...args
}) => (
  <IconTextButton<'button'>
    {...args}
    as="button"
    icon={<BlobbrIcon scale={size as IconScale} />}
    loader={<SpinnerIcon scale={size as IconScale} />}
    onClick={action('clicked')}
    size={size}
  >
    {children}
  </IconTextButton>
);

const defaultArgs = {
  active: false,
  align: 'center' as IconTextButtonProps['align'],
  as: 'button' as IconTextButtonProps['as'],
  children: 'Click me',
  color: 'primary' as IconTextButtonProps['color'],
  disabled: false,
  focused: false,
  fullWidth: false,
  loading: false,
  noHeight: false,
  noPadding: false,
  shape: 'pill' as IconTextButtonProps['shape'],
  size: 'medium' as IconTextButtonProps['size'],
  type: 'button' as IconTextButtonProps['type'],
  unstyled: false,
  unthemed: false,
  weight: 'solid' as IconTextButtonProps['weight'],
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
  weight: 'inline',
};

export const PillShape = Template.bind({});
PillShape.storyName = 'Shape: Pill';
PillShape.args = {
  ...defaultArgs,
  shape: 'pill',
};

export const BrickShape = Template.bind({});
BrickShape.storyName = 'Shape: Brick';
BrickShape.args = {
  ...defaultArgs,
  shape: 'brick',
};

export const SmallSize = Template.bind({});
SmallSize.storyName = 'Size: Small';
SmallSize.args = {
  ...defaultArgs,
  size: 'small',
};

export const MediumSize = Template.bind({});
MediumSize.storyName = 'Size: Medium';
MediumSize.args = {
  ...defaultArgs,
  size: 'medium',
};

export const LargeSize = Template.bind({});
LargeSize.storyName = 'Size: Large';
LargeSize.args = {
  ...defaultArgs,
  size: 'large',
};

export const Reversed = Template.bind({});
Reversed.args = {
  ...defaultArgs,
  reverse: true,
};

export const Loading = Template.bind({});
Loading.args = {
  ...defaultArgs,
  loading: true,
};

export const Link = ({ size, ...args }: IconTextButtonProps<'a'>) => (
  <IconTextButton<'a'> {...args} icon={<BlobbrIcon scale={size as IconScale} />} size={size} />
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
