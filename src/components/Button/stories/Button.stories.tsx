import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { IconScale } from '../../../types';
import { SpinnerIcon } from '../../../icons/SpinnerIcon';
import { ButtonProps, Button } from '../Button';
import ButtonDocumentation from './Button.docs.mdx';

export default {
  title: 'Buttons/Button',
  component: Button,
  argTypes: {
    type: {
      options: ['button', 'submit'],
      control: { type: 'inline-radio' },
    },

    align: {
      options: ['left', 'center', 'right'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    color: {
      options: ['primary', 'success', 'warning', 'danger', 'neutral', 'black', 'white'],
      control: { type: 'radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    shape: {
      options: ['pill', 'brick'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    weight: {
      options: ['solid', 'shaded', 'outlined', 'ghost', 'inline'],
      control: { type: 'radio' },
      table: {
        category: 'Appearance controls',
      },
    },

    active: {
      table: {
        category: 'State controls',
      },
    },
    disabled: {
      table: {
        category: 'State controls',
      },
    },
    focused: {
      table: {
        category: 'State controls',
      },
    },
    loading: {
      table: {
        category: 'State controls',
      },
    },

    as: {
      table: {
        category: 'Uncommon controls',
      },
    },
    contrast: {
      table: {
        category: 'Uncommon controls',
      },
    },
    fullWidth: {
      table: {
        category: 'Uncommon controls',
      },
    },
    imitation: {
      table: {
        category: 'Uncommon controls',
      },
    },
    noHeight: {
      table: {
        category: 'Uncommon controls',
      },
    },
    noPadding: {
      table: {
        category: 'Uncommon controls',
      },
    },
    style: {
      table: {
        category: 'Uncommon controls',
      },
    },
    unstyled: {
      table: {
        category: 'Uncommon controls',
      },
    },
    unthemed: {
      table: {
        category: 'Uncommon controls',
      },
    },

    loader: {
      control: {
        disable: true,
      },
      table: {
        category: 'Remaining props',
      },
    },
    onClick: {
      control: {
        disable: true,
      },
      table: {
        category: 'Remaining props',
      },
    },

    href: {
      table: {
        category: 'Link controls',
        disable: true,
      },
    },
    target: {
      table: {
        category: 'Link controls',
        disable: true,
      },
    },
  },
  parameters: {
    controls: {
      exclude: ['className', 'ref', 'themeId'],
      sort: 'requiredFirst',
    },
    docs: {
      page: ButtonDocumentation,
      description: {
        component: 'A simple text button or a link that looks like a button.',
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

export const Loading = Template.bind({});
Loading.args = {
  ...defaultArgs,
  loading: true,
};

export const Link = (args: ButtonProps<'a'>) => <Button<'a'> {...args} />;
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
