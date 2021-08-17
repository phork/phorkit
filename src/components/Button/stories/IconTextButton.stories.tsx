import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { IconScale } from '../../../types';
import { SpinnerIcon } from '../../../icons/SpinnerIcon';
import { BlobbrIcon } from '../../../icons/internal/BlobbrIcon';
import { IconTextButtonProps, IconTextButton } from '../IconTextButton';
import buttonStory from './Button.stories';

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

export const Brick = Template.bind({});
Brick.storyName = 'Shape: Brick';
Brick.args = {
  ...defaultArgs,
  shape: 'brick',
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
