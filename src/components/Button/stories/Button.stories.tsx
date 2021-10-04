import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { IconScale } from 'types';
import { SpinnerIcon } from 'icons/SpinnerIcon';
import { ButtonProps, Button } from '../Button';
import ButtonDocumentation from './Button.docs.mdx';

export default {
  title: 'Buttons/Button',
  component: Button,
  argTypes: {
    align: {
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    color: {
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    loader: {
      control: {
        disable: true,
      },
      table: {
        category: 'Appearance',
      },
    },
    shape: {
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    size: {
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    weight: {
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },

    active: {
      table: {
        category: 'State',
      },
    },
    disabled: {
      table: {
        category: 'State',
      },
    },
    focused: {
      table: {
        category: 'State',
      },
    },
    loading: {
      table: {
        category: 'State',
      },
    },
    type: {
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'State',
      },
    },

    onClick: {
      table: {
        category: 'Actions',
      },
    },

    as: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    className: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    contrast: {
      table: {
        category: 'Uncommon',
      },
    },
    fullWidth: {
      table: {
        category: 'Uncommon',
      },
    },
    imitation: {
      table: {
        category: 'Uncommon',
      },
    },
    noHeight: {
      table: {
        category: 'Uncommon',
      },
    },
    noPadding: {
      table: {
        category: 'Uncommon',
      },
    },
    style: {
      table: {
        category: 'Uncommon',
      },
    },
    themeId: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    unstyled: {
      table: {
        category: 'Uncommon',
      },
    },
    unthemed: {
      table: {
        category: 'Uncommon',
      },
    },

    href: {
      table: {
        category: 'Link',
        disable: true,
      },
    },
    target: {
      table: {
        category: 'Link',
        disable: true,
      },
    },
  },
  parameters: {
    controls: {
      exclude: ['ref'],
      sort: 'requiredFirst',
    },
    docs: {
      page: ButtonDocumentation,
      description: {
        component: 'A simple text button, or a link that looks like a button.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<(args: ButtonProps) => ReturnType<typeof Button>>;

const Template: ComponentStory<(args: ButtonProps) => ReturnType<typeof Button>> = ({ children, size, ...args }) => (
  <Button<'button'>
    {...args}
    as="button"
    loader={<SpinnerIcon scale={size as IconScale} />}
    onClick={action('clicked')}
    size={size}
  >
    {children}
  </Button>
);

const defaultArgs = {
  active: false,
  align: 'center' as ButtonProps['align'],
  as: 'button' as ButtonProps['as'],
  children: 'Click me',
  color: 'primary' as ButtonProps['color'],
  disabled: false,
  focused: false,
  fullWidth: false,
  loading: false,
  noHeight: false,
  noPadding: false,
  shape: 'pill' as ButtonProps['shape'],
  size: 'medium' as ButtonProps['size'],
  type: 'button' as ButtonProps['type'],
  unstyled: false,
  unthemed: false,
  weight: 'solid' as ButtonProps['weight'],
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

export const Loading = Template.bind({});
Loading.args = {
  ...defaultArgs,
  loading: true,
};

export const Link = (args: ButtonProps<'a'>) => <Button<'a'> {...args} />;
Link.args = {
  ...defaultArgs,
  as: 'a',
  href: 'https://phorkit.org',
  target: '_blank',
};

Link.argTypes = {
  href: { table: { disable: false } },
  target: { table: { disable: false } },
};

export const Imitation = (args: ButtonProps<'div'>) => <Button<'div'> {...args} />;
Imitation.args = {
  ...defaultArgs,
  as: 'div',
  imitation: true,
};
