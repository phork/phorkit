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

export const Primary = Template.bind({});
Primary.storyName = 'Color: Primary';
Primary.args = {
  ...defaultArgs,
  color: 'primary',
};

export const Success = Template.bind({});
Success.storyName = 'Color: Success';
Success.args = {
  ...defaultArgs,
  color: 'success',
};

export const Warning = Template.bind({});
Warning.storyName = 'Color: Warning';
Warning.args = {
  ...defaultArgs,
  color: 'warning',
};

export const Danger = Template.bind({});
Danger.storyName = 'Color: Danger';
Danger.args = {
  ...defaultArgs,
  color: 'danger',
};

export const Neutral = Template.bind({});
Neutral.storyName = 'Color: Neutral';
Neutral.args = {
  ...defaultArgs,
  color: 'neutral',
};

export const Black = Template.bind({});
Black.storyName = 'Color: Black';
Black.args = {
  ...defaultArgs,
  color: 'black',
};

export const White = Template.bind({});
White.storyName = 'Color: White';
White.args = {
  ...defaultArgs,
  color: 'white',
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

export const Inline = Template.bind({});
Inline.storyName = 'Weight: Inline';
Inline.args = {
  ...defaultArgs,
  weight: 'inline',
};

export const Pill = Template.bind({});
Pill.storyName = 'Shape: Pill';
Pill.args = {
  ...defaultArgs,
  shape: 'pill',
};

export const Brick = Template.bind({});
Brick.storyName = 'Shape: Brick';
Brick.args = {
  ...defaultArgs,
  shape: 'brick',
};

export const Small = Template.bind({});
Small.storyName = 'Size: Small';
Small.args = {
  ...defaultArgs,
  size: 'small',
};

export const Medium = Template.bind({});
Medium.storyName = 'Size: Medium';
Medium.args = {
  ...defaultArgs,
  size: 'medium',
};

export const Large = Template.bind({});
Large.storyName = 'Size: Large';
Large.args = {
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
